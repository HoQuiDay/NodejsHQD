import express from "express";
import homeController from "../controllers/homeController";
let router = express.Router();
let initRebRouters = (app) => { 
    router.get('/', homeController.getHomepage);
    router.get("/crud", homeController.getCRUD)
    router.post("/post-crud", homeController.postCRUD)
    router.get("/get-crud", homeController.DisplayGetCRUD)
    return app.use("/", router);
}
module.exports = initRebRouters;