import bcrypt from "bcryptjs";
import db from "../models/index";
import { raw } from "body-parser";
const salt = bcrypt.genSaltSync(10);
let createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPasswordFromBcrypt = await hashUserPassword(data.password);
      await db.User.create({
        email: data.email,
        password: hashPasswordFromBcrypt,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        gender: data.gender === "1" ? true : false,
        roleId: data.roleId,
        phonenumber: data.phonenumber
      });
      resolve("ok! Create a new user succeed!");
    } catch (e) {
      reject(e);
    }
  });
};
let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};
let getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await db.User.findAll({ raw: true });
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};
let getUserinfoById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: userId },
        raw: true
      });
      if (user) {
        resolve(user);
      } else {
        resolve({});
      }
    } catch (e) {
      reject(e);
    }
  });
};
let updateUserData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: data.id }
      });
      if (user) {
        (user.firstName = data.firstName),
          (user.lastName = data.lastName),
          (user.address = data.address),
          (user.phonenumber = data.phonenumber);
        await user.save();
        let allUsers = await db.User.findAll({ raw: true });
        resolve(allUsers);
      } else {
        resolve();
      }
    } catch (e) {
      reject(e);
    }
  });
};
let deleteUserByID = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: userId }
      });
      if (user) {
        await user.destroy();
        resolve("DELETE User success");
      } else {
        resolve();
      }
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  createNewUser: createNewUser,
  getAllUser: getAllUser,
  getUserinfoById: getUserinfoById,
  updateUserData: updateUserData,
  deleteUserByID: deleteUserByID
};
