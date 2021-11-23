
export default async function handler (req, res)
{
    const repository = req.query.repository || process.env.repositoryId;
    const branch = req.query.branch || process.env.branchId;
    const platform = req.query.platform;
    const url = req.query.url || "/";


    res.setPreviewData({ repository, branch, platform });
    res.redirect(url);
}