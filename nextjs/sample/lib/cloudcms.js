import * as cloudcms from 'cloudcms';
import * as gitanaJson from '../gitana.json';
import * as fs from 'fs';
import mime from 'mime-types';

const CLOUDCMS_SAVE_PATH = `${process.cwd()}/.next/static/cloudcms`
const CLOUDCMS_OUT = `_next/static/cloudcms`

let session = null;
let savedAttachments = {};

let branchId = 'master';
let repositoryId = '026e69ddefe3a5a6a6cc';

async function connect() {
    if (!session) {
        session = await cloudcms.connect(gitanaJson);
    }

    return session;
}

async function bindExtraProperties_response(response) {
    if (response && response.rows) {
        // Bind extra properties for all rows in the response
        const tasks = response.rows.map(row => bindExtraProperties_row(row))
        await Promise.all(tasks);
    }
}

async function bindExtraProperties_row(row) {
    try {
        console.log("ENHANCE");
        row.defaultAttachmentUrl = await downloadAttachment(row._doc, "default");
        console.log("ENHANCED: " + row.title);
    } catch (e) {
        // swallow
    }
}

export async function queryOne(query) {
    const session = await connect();
    let row = null;

    const response = (await session.queryNodes(repositoryId, branchId, query, { limit: 1 }));
    if (response && response.rows && response.rows.length > 0) {
        row = response.rows[0];
    }

    if (row)
    {
      await bindExtraProperties_row(row);
    }

    return row;
}

export async function query(query, pagination) {
    const session = await connect();
    let response = await session.queryNodes(repositoryId, branchId, query, pagination);
    if (response && response.rows && response.rows.length > 0)
    {
      await bindExtraProperties_response(response);
    }

    return response.rows;
}

export async function track(path, html, title) {
    const session = await connect();
    await session.trackPage(repositoryId, branchId, { path, html, title });
}

export async function getBooks() {
    return await query({ _type: "store:book" }, { limit: 4 });
    ;
}

export async function getAuthors() {
    return await query({ _type: "store:author" }, { limit: 4 });
}

export async function readBook(id) {
    const session = await connect();

    let book = await session.readNode(repositoryId, branchId, id);
    book.defaultAttachmentUrl = await downloadAttachment(id, "default");
    book.pdfUrl = await downloadAttachment(id, "book_pdf");

    for (let rec of book.recommendations) {
        rec._doc = rec.id;
        rec.defaultAttachmentUrl = (await downloadAttachment(rec._doc, "default"));
    }

    return book;
}

export async function downloadAttachment(nodeId, attachmentId) {
    const tokens = `${repositoryId}/${branchId}/${nodeId}/${attachmentId}`;

    if (!savedAttachments[tokens]) {
        const saveDir = `${CLOUDCMS_SAVE_PATH}/${repositoryId}/${branchId}/${nodeId}`;
        if (!fs.existsSync(saveDir)) {
            fs.mkdirSync(saveDir, { recursive: true });
        }

        const session = await connect();
        const attachment = await session.downloadAttachment(repositoryId, branchId, nodeId, attachmentId);
        const ext = mime.extension(attachment.headers['content-type']);

        const savePath = `${tokens}.${ext}`;
        savedAttachments[tokens] = savePath;
        const ws = fs.createWriteStream(`${CLOUDCMS_SAVE_PATH}/${savedAttachments[tokens]}`);
        attachment.pipe(ws);
    }

    const outputPath = `/${CLOUDCMS_OUT}/${savedAttachments[tokens]}`;
    return outputPath;
}

export async function getTags() {
    const session = await connect();


    let tags = (await session.queryNodes(repositoryId, branchId, { _type: "n:tag" }, { limit: 1000 })).rows;

    return tags;
}
