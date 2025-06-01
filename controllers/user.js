const User= require("../models/user")
const {v4: uuidv4} = require("uuid")
const {setuserid,getuserwithid}= require("./session/auth");

async function handleUserSignup(req,res) {
    const userbody= req.body;
    User.create({
        first_name: userbody.first_name,
        last_name: userbody.last_name,
        email: userbody.email,
        password: userbody.password,
        createdBy: req.user._id,
    })
    // console.log(userbody);
    return res.redirect("/");
}

async function handleLoginUser(req,res) {
    const {email,password}=req.body;
    const user= await User.findOne({email,password});
    // console.log(user);
    if(!user){
        return res.render("login",{
            error: "invalid email or password"
        });
    }
    //-----statefull authorization--------
    // const session_id= uuidv4();
    // setuserid(session_id , user); 
    // res.cookie("uid", session_id);
     

    //-----stateless authorization---------
    const token= setuserid(user);
    res.cookie("uid",token);

    
    return res.redirect("/");
}
module.exports={
    handleUserSignup,handleLoginUser,
}