const express =require("express");
const {connectDB}= require("./connect")
const path=require("path")
const URL= require("./models/url");

const url_Route= require("./routes/url")
const static_route=require("./routes/staticrouter");
const user_route= require("./routes/user");
const cookie_parser= require("cookie-parser");
// const {restrict_to_login_user_only,check_auth} = require("./middleware/auth");
const {checkForAuthentication,restrictTo} = require("./middleware/auth");

const app= express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookie_parser());
app.use(express.static('public'));
app.use(checkForAuthentication);

const PORT=8000;

const DBurl="mongodb://mongo:ydSNAXLaSzbvpfuBiDAcKNurVmmLlcGa@gondola.proxy.rlwy.net:50435"
const DBurl2="mongodb://mongo:kxOsruKzeVzIKdWOrfVjWAaKcAJKbqEj@mainline.proxy.rlwy.net:21648"
const dbrul2="mongodb://mongo:yjemcFoIjWCMcuUnCPnkuDKKLKFgVTGg@interchange.proxy.rlwy.net:51370";
const installed_mongodb=  "mongodb://127.0.0.1:27017/URL-Shortner"

connectDB(installed_mongodb).then(()=>console.log("MongoDB connected"));

const mongoose = require('mongoose');

// mongoose.connect('mongodb://mongo:kxOsruKzeVzIKdWOrfVjWAaKcAJKbqEj@mainline.proxy.rlwy.net:21648', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     keepAlive: true,
//     socketTimeoutMS: 30000,
// })
// .then(() => console.log('✅ MongoDB connected'))
// .catch(err => console.error('❌ MongoDB connection error:', err));

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));


app.use("/url", restrictTo(['NORMAL', 'ADMIN']), url_Route);
// app.use("/admin", static_route);
app.use("/",static_route);
app.use("/user",user_route);
app.use("/login",user_route);

app.listen(PORT,()=>{
    console.log("Server Started at PORT: ",PORT);
});
