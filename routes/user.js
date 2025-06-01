const express= require("express");
const router= express.Router();
const {handleUserSignup,handleLoginUser} = require("../controllers/user");

router.post("/signup",handleUserSignup);
router.post("/login",handleLoginUser);
router.get('/logout', (req, res) => {
  res.clearCookie('uid');
  return res.redirect('/login');
});
module.exports=router;