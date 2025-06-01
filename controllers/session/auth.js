const session_id_to_user_map = new Map();
const { escapeXML } = require("ejs");
const jwt= require("jsonwebtoken");

const secretkey="Siddharth@url-shortner"


// function setuserid(id,user){
//     session_id_to_user_map.set(id,user);
// }

// function getuserwithid(id){
//     return session_id_to_user_map.get(id);
// }

function setuserid(user){
    const payload ={
        _id: user._id,
        email:user.email,
        role:user.role,
    }
    return jwt.sign(payload,secretkey);
}


function getuserwithid(token) {
  try {
    if (!token) return null;
    return jwt.verify(token, secretkey);
  } catch (e) {
    console.error("JWT Error:", e.message);
    return null;
  }
}


module.exports={
    setuserid,
    getuserwithid,
}