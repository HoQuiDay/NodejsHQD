import express from "express";
import homeController from "../controllers/homeController";
let router = express.Router();
let initRebRouters = (app) => { 
    router.get('/', homeController.getHomepage);
    return app.use("/", router);
}
module.exports = initRebRouters;