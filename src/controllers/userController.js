import { json } from "body-parser";
import db from "../models/index";
import userService from "../services/userService";

let handleLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  if (!email || !password) {
    return res.status(500).json({
      message: "Missing required fields",
      errorCode: 1,
    });
  }
  let userData = await userService.handleUserLogin(email, password);
  return res.status(200).json({
    errorCode: userData.errorCode,
    message: userData.errorMessage,
    user: userData.user,
    user: userData.user ? userData.user : {},
  });
};
let handleGetAllUsers = async (req, res) => {
  let id = req.query.id;
  if (!id) {
    return res.status(200).json({
      errCode: 0,
      errMessage: "Missing User Id",
      users: [],
    });
  }
  let users = await userService.getAllUsers(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "Ok",
    users,
  });
};
let handleCreatUser = async (req, res) => {
  let user = req.body;
  let message = await userService.createUser(user);
  return res.status(200).json(message);
};
let handleEditUser = async (req, res) => {
  let data = req.body;
  let message = await userService.editUser(data);
  return res.status(200).json(message);
};
let handleDeleteUser = async (req, res) => {
  let userId = req.query.id;
  let message = await userService.deleteUser(userId);
  return res.status(200).json(message);
};
module.exports = {
  handleLogin: handleLogin,
  handleGetAllUsers: handleGetAllUsers,
  handleCreatUser: handleCreatUser,
  handleEditUser: handleEditUser,
  handleDeleteUser: handleDeleteUser,
};
