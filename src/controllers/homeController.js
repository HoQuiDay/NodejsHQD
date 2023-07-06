import { json } from "body-parser"
import db from "../models/index"
import CRUDService from "../services/CRUDService"
let getHomepage = async (req, res) => {
  try {
    let data = await db.User.findAll()
    return res.render("homepage.ejs", { data: JSON.stringify(data) })
  } catch (e) {
    console.log(e)
  }
}
let getCRUD = (req, res) => {
  return res.render("crud.ejs")
}
let postCRUD = async (req, res) => {
  let message = await CRUDService.createNewUser(req.body)
  console.log(message)
  return res.send("post crud from server")
}
let DisplayGetCRUD = async (req, res) => {
  try {
    let data = await CRUDService.getAllUser()
    return res.render("displayCRUD.ejs", { dataTable: data })
  } catch (error) {
    console.log(error)
  }
}
module.exports = {
  getHomepage: getHomepage,
  getCRUD: getCRUD,
  postCRUD: postCRUD,
  DisplayGetCRUD: DisplayGetCRUD
}
