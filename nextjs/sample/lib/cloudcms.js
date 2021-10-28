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

export async function getBooks()
{
    const session = await connect();

    
    let books = (await session.queryNodes(repositoryId, branchId, { _type: "store:book" }, { limit: 4 })).rows;

    for (let book of books)
    {
        book.imageUrl = await downloadAttachment(book._doc, "default");
    }

    return books;
}

export async function getAuthors()
{
    const session = await connect();

    let authors = (await session.queryNodes(repositoryId, branchId, { _type: "store:author" }, { limit: 4 })).rows;
    for (let author of authors)
    {
        author.imageUrl = await downloadAttachment(author._doc, "default");
    }

    return authors;
}

export async function readBook(id)
{
    const session = await connect();

    let book = await session.readNode(repositoryId, branchId, id);
    book.imageUrl = await downloadAttachment(id, "default");
    book.pdfUrl = await downloadAttachment(id, "book_pdf");

    for (let rec of book.recommendations)
    {
        rec._doc = rec.id;
        rec.imageUrl = (await downloadAttachment(rec._doc, "default"));
    }

    return book;
}

export async function downloadAttachment(nodeId, attachmentId)
{
    const tokens = `${repositoryId}/${branchId}/${nodeId}/${attachmentId}`;

    if (!savedAttachments[tokens])
    {
        const saveDir = `${CLOUDCMS_SAVE_PATH}/${repositoryId}/${branchId}/${nodeId}`;
        if (!fs.existsSync(saveDir))
        {
            fs.mkdirSync(saveDir, {recursive: true});
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

export async function track(path, html, title)
{
    const session = await connect();
    await session.trackPage(repositoryId, branchId, { path, html, title });
}



async function connect()
{
    if (!session)
    {
        session = await cloudcms.connect(gitanaJson);
    }

    return session;
}
