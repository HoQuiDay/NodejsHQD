import bcrypt from "bcryptjs";
import db from "../models/index";
const salt = bcrypt.genSaltSync(10);
let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExits = await handleCheckEmail(email);
      if (isExits) {
        let user = await db.User.findOne({
          attributes: ["email", "password", "roleId"],
          where: { email: email },
          raw: true,
        });
        if (user) {
          let check = await bcrypt.compareSync(password, user.password);
          if (check) {
            userData.errorCode = 0;
            userData.errorMessage = "Login success";
            userData.user = user;
            delete user.password;
            resolve(userData);
          } else {
            userData.errorCode = 3;
            userData.errorMessage = "Invalid Password";
            resolve(userData);
          }
        } else {
          userData.errorCode = 2;
          userData.errorMessage = "Can not find user";
          resolve(userData);
        }
      } else {
        userData.errorCode = 1;
        userData.errorMessage = "Invalid Email";
        resolve(userData);
      }
    } catch (error) {
      reject(error);
    }
  });
};
let handleCheckEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: userEmail },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};
let getAllUsers = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      if (userId === "ALL") {
        users = await db.User.findAll({
          attributes: { exclude: ["password"] },
        });
        resolve(users);
      } else if (userId) {
        users = await db.User.findOne({
          where: { id: userId },
          attributes: { exclude: ["password"] },
        });
        resolve(users);
      } else {
        resolve(users);
      }
    } catch (error) {
      reject(error);
    }
  });
};
let createUser = (user) => {
  return new Promise(async (resolve, reject) => {
    try {
      let checkEmail = await db.User.findOne({ where: { email: user.email } });
      if (checkEmail) {
        resolve({
          errorCode: 1,
          errorMessage: "Email already exists",
        });
      } else {
        if (!user.email || !user.password || !user.lastName || !user.firstName || !user.address) {
          resolve({ errorCode: 2, errorMessage: "Missing required fields" });
        } else {
          let hashPasswordFromBcrypt = await hashUserPassword(user.password);
          await db.User.create({
            email: user.email,
            password: hashPasswordFromBcrypt,
            firstName: user.firstName,
            lastName: user.lastName,
            address: user.address,
            gender: user.gender === "1" ? true : false,
            roleId: user.roleId,
            phonenumber: user.phonenumber,
          });
          resolve({
            errorCode: 0,
            errorMessage: "User created successfully",
          });
        }
      }
    } catch (error) {
      reject(error);
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
let editUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errorCode: 1,
          errorMessage: "Missing userId",
        });
      }
      let user = await db.User.findOne({
        where: { id: data.id },
        raw: false,
      });

      if (user) {
        user.firstName = data.firstName === "" ? user.firstName : data.firstName;
        user.lastName = data.lastName === "" ? user.lastName : data.lastName;
        user.address = data.address === "" ? user.address : data.address;
        user.phonenumber = data.phonenumber === "" ? user.phonenumber : data.phonenumber;
        await user.save();
        resolve({
          errorCode: 0,
          errorMessage: "User updated successfully",
        });
      } else {
        resolve({
          errorCode: 2,
          errorMessage: "User not found",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let deleteUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!userId) {
        resolve({
          errorCode: 1,
          errorMessage: "Missing required fields",
        });
      } else {
        let checkId = await db.User.findOne({ where: { id: userId } });
        if (checkId) {
          await db.User.destroy({
            where: {
              id: userId,
            },
          });
          resolve({
            errorCode: 0,
            errorMessage: "User deleted successfully",
          });
        } else {
          resolve({
            errorCode: 2,
            errorMessage: "User not found",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  handleUserLogin: handleUserLogin,
  getAllUsers: getAllUsers,
  createUser: createUser,
  editUser: editUser,
  deleteUser: deleteUser,
};
