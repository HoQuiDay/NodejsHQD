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
let getEditCRUD = async (req, res) => {
  let userId = req.query.id
  if (userId) {
    let userData = await CRUDService.getUserinfoById(userId)
    return res.render("editCRUD.ejs", { user: userData })
  } else {
    return res.send("NOT FOUND USER")
  }
}
let putCRUD = async (req, res) => {
  let data = req.body
  let allUser = await CRUDService.updateUserData(data)
  return res.render("displayCRUD.ejs", { dataTable: allUser })
}
let deleteCRUD = async (req, res) => {
  let userId = req.query.id
  if (userId) {
    await CRUDService.deleteUserByID(userId)
    return res.send("Delete success")
  } else {
    return res.send("Not Found User With ID")
  }
}
module.exports = {
  getHomepage: getHomepage,
  getCRUD: getCRUD,
  postCRUD: postCRUD,
  DisplayGetCRUD: DisplayGetCRUD,
  getEditCRUD: getEditCRUD,
  putCRUD: putCRUD,
  deleteCRUD: deleteCRUD
}
