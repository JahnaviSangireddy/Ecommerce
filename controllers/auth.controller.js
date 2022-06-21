const db = require("../models");
const config = require("../configs/auth.configs");

const user = db.user;
const role = db.role;
const op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signUp = (req,res)=>{

}

exports.signIn = (req,res)=>{

}