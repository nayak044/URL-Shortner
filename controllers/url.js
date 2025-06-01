const { nanoid } = require("nanoid");
const URL = require("../models/url");

async function handleGenerateURL(req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: "url is required" });

    const shortID = nanoid(8);

    await URL.create({
        shortId: shortID, 
        redirectURL: body.url,
        visitHistory: [],
        createdBy: req.user._id,
    });
    return res.render("home",{
        id:shortID,
    });
}
async function handeGetUrl(req,res) {
    return res.render("home");
}

async function handleShortURL(req, res) {
    const shortId = req.params.id;
    const entry =await URL.findOneAndUpdate(
        { shortId }, 
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                },
            },
        }
    );

    return res.redirect(entry.redirectURL);
}

async function handleDeleteURL(req, res) {
    const shortID = req.params.id;

    await URL.findOneAndDelete({ shortId: shortID });
    return res.json({ success: true });
}



async function handlegetanalytics(req,res) {
    const shortID=req.params.id;
    const result = await URL.findOne({ shortId: shortID });
    return res.json({ totalcliks: result.visitHistory.length,
        analytics: result.visitHistory,
    })
}

module.exports = {
    handleGenerateURL,
    handleShortURL,
    handlegetanalytics,
    handeGetUrl,
    handleDeleteURL,
};
