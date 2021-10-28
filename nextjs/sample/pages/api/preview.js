// import * as cloudcms from 'cloudcms';

export default async function handler (req, res)
{
    const repository = req.query.repository || 'c517484d30f8f7b4dee8';
    const branch = req.query.branch || 'master';

    res.setPreviewData({ repository, branch });
}