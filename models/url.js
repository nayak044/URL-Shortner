const mongoose= require("mongoose");

// const DBurl="mongodb://mongo:ydSNAXLaSzbvpfuBiDAcKNurVmmLlcGa@gondola.proxy.rlwy.net:50435"
// mongoose.connect(DBurl);

const urlSchema = mongoose.Schema({
    shortId:{
        type: String,
        required: true,
        unique: true,
    },
    redirectURL:{
        type:String,
        required: true,
    },
    visitHistory:[{timestamp:{ type: Number}}],
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user",
    }
},
{timestamps:true});

const URL=mongoose.model("URL",urlSchema);

module.exports= URL;