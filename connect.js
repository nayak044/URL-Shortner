const mongoose= require("mongoose");

// const DBurl="mongodb://mongo:ydSNAXLaSzbvpfuBiDAcKNurVmmLlcGa@gondola.proxy.rlwy.net:50435"
// mongoose.connect(DBurl);

async function connectDB(DBurl) {
    return  mongoose.connect(DBurl);  
}

module.exports={connectDB};