const express= require("express");

const router= express.Router();

const {handleGenerateURL,handleShortURL, handlegetanalytics,handeGetUrl,handleDeleteURL} = require("../controllers/url")

router.post("/",handleGenerateURL);
router.get("/",handeGetUrl);

router.delete('/delete/:id', handleDeleteURL);

router.get("/analytics/:id",handlegetanalytics);


router.get("/:id",handleShortURL);

module.exports=router;