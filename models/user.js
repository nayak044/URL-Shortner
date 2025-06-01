const mongoose= require("mongoose");

const user_schema= mongoose.Schema({
    first_name:{
        type: String,
        required: true,
    },
    last_name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required:true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    role:{
        type: String,
        required: true,
        default: 'NORMAL',
    }

}, {timestamps:true})

const users= mongoose.model("users",user_schema);

module.exports= users;