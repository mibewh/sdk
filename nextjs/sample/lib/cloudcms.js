import * as cloudcms from 'cloudcms';
import * as gitanaJson from '../gitana.json';
import * as fs from 'fs';
import mime from 'mime-types';

const CLOUDCMS_SAVE_PATH = `${process.cwd()}/.next/static/cloudcms`
const CLOUDCMS_OUT = `_next/static/cloudcms`

let session = null;
let savedAttachments = {};

function getRepositoryBranch(context)
{
    let result = {};
    if (context.preview && context.previewData)
    {
        result = {
            repository: context.previewData.repository,
            branch: context.previewData.branch
        }
    }

    if (!result.repository)
    {
        result.repository = process.env.repositoryId;
    }

    if (!result.branch)
    {
        result.branch = process.env.branchId;
    }
    if (!result.branch)
    {
        result.branch = "master";
    }

    return result;
}

async function connect() {
    if (!session) {
        session = await cloudcms.connect(gitanaJson);
    }

    return session;
}

async function bindExtraProperties_response(context, response) {
    if (response && response.rows) {
        // Bind extra properties for all rows in the response
        const tasks = response.rows.map(row => bindExtraProperties_row(context, row))
        await Promise.all(tasks);
    }
}

async function bindExtraProperties_row(context, row) {
    try {
        row.defaultAttachmentUrl = await downloadAttachment(context, row._doc, "default");
    } catch (e) {
        // swallow
    }
}

export async function queryOne(context, query) {
    const session = await connect();
    const {repository, branch} = getRepositoryBranch(context);

    let row = null;

    const response = (await session.queryNodes(repository, branch, query, { limit: 1 }));

    if (response && response.rows && response.rows.length > 0) {
        row = response.rows[0];
    }

    if (row)
    {
      await bindExtraProperties_row(context, row);
    }

    return row;
}

export async function query(context, query, pagination) {
    const session = await connect();
    const {repository, branch} = getRepositoryBranch(context);

    let response = await session.queryNodes(repository, branch, query, pagination);
    if (response && response.rows && response.rows.length > 0)
    {
      await bindExtraProperties_response(context, response);
    }

    return response.rows;
}

export async function read(context, id) {
    const session = await connect();
    const {repository, branch} = getRepositoryBranch(context);

    let node = await session.readNode(repository, branch, id);
    if (node)
    {
        await bindExtraProperties_row(context, node);
    }

    return node;
}

export async function track(repository, branch, path, html, title) {
    const session = await connect();
    await session.trackPage(repository, branch, { path, html, title });
}

export async function getBooks(context) {
    if (!context)
    {
        context = {
            repository: process.env.repositoryId,
            branch: process.env.branchId
        };
    }
    return await query(context, { _type: "store:book" }, { limit: -1 });
}

export async function getAuthors(context) {
    if (!context)
    {
        context = {
            repository: process.env.repositoryId,
            branch: process.env.branchId
        };
    }
    return await query(context, { _type: "store:author" }, { limit: -1 });
}

export async function downloadAttachment(context, nodeId, attachmentId) {
    const {repository, branch} = getRepositoryBranch(context);
    const tokens = `${repository}/${branch}/${nodeId}/${attachmentId}`;

    // Redownload if not cached or this is a preview
    if (!savedAttachments[tokens] || context.preview) {
        const saveDir = `${CLOUDCMS_SAVE_PATH}/${repository}/${branch}/${nodeId}`;
        if (!fs.existsSync(saveDir)) {
            fs.mkdirSync(saveDir, { recursive: true });
        }

        const session = await connect();
        const attachment = await session.downloadAttachment(repository, branch, nodeId, attachmentId);
        const ext = mime.extension(attachment.headers['content-type']);

        const savePath = `${tokens}.${ext}`;
        savedAttachments[tokens] = savePath;
        const ws = fs.createWriteStream(`${CLOUDCMS_SAVE_PATH}/${savedAttachments[tokens]}`);
        attachment.pipe(ws);
    }

    const outputPath = `/${CLOUDCMS_OUT}/${savedAttachments[tokens]}`;
    return outputPath;
}

export async function getTags(context) {
    if (!context)
    {
        context = {
            repository: process.env.repositoryId,
            branch: process.env.branchId
        };
    }
    const session = await connect();
    const {repository, branch} = getRepositoryBranch(context);

    let tags = (await session.queryNodes(repository, branch, { _type: "n:tag" }, { limit: 1000 })).rows;

    return tags;
}
