import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRouters from "./route/web";
import connectDB from "./config/connectDb"
require("dotenv").config()
let app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
viewEngine(app)
initWebRouters(app)
connectDB()
let port = process.env.port || 6966;
app.listen(port, () => { console.log("Server run on the port: "+port)});