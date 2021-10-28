import * as cloudcms from 'cloudcms';
import * as fs from 'fs';
import * as gitanaJson from '../../../gitana.json';
import mime from 'mime-types';


export default async function handler (req, res)
{
    console.log("start request");
    let session;
    try
    {
        session = await getSession();

    }
    catch (ex)
    {
        console.error("Session: " + ex);
    }
    console.log("got session");
    const { nodeId, attachmentId } = req.query;

    const repositoryId = req.query.repository || 'c517484d30f8f7b4dee8';
    const branchId = req.query.branch || 'master';

    try
    {
        let attachment = await session.downloadAttachment(repositoryId, branchId, nodeId, attachmentId);
        attachment.pipe(res);

        const tokens = `${repositoryId}/${branchId}/${nodeId}/${attachmentId}`;
        const ws = fs.createWriteStream(`${__dirname}/${tokens}`);
        attachment.pipe(ws);
        const rs = fs.createReadStream(`${__dirname}/${tokens}`);
        rs.pipe(res);
        rs.on("end", () => fs.unlinkSync(`${__dirname}/${tokens}`));
    }
    catch (ex)
    {
        console.error("Attachment: " + ex);
    }
    // attachment.on('end', () => res.status(200).end());
    console.log("made it");
}

let _session = null;
async function getSession()
{
    if (!_session)
    {
        _session = await cloudcms.connect(gitanaJson);
    }

    return _session;
}