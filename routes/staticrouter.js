const express = require("express");
const router = express.Router();
const URL = require("../models/url");
const {restrictTo} = require("../middleware/auth")
router.get("/admin", restrictTo(['ADMIN']),async (req, res) => {
    const curr_user = req.user;
    if (!curr_user) return res.redirect("/login");
    const allUrls = await URL.find({});
    return res.render("home", {
        urls: allUrls,
        user: curr_user,
    });
});


router.get("/", async (req, res) => {
    const curr_user = req.user;
    if (!curr_user) return res.redirect("/login");
    const allUrls = await URL.find({ createdBy: curr_user._id });
    return res.render("home", {
        urls: allUrls,
        user: curr_user,
    });
});

router.get("/signup", (req, res) => {
    return res.render("signup");
});

router.get("/login", (req, res) => {
    return res.render("login");
});

module.exports = router;
