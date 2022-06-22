const db = require("../models");
const User = db.user;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

verifyToken = (req,res,next)=>{

}

isAdmin = (req,res,next)=>{

}

const authJwt={
    verifyToken:verifyToken,
    isAdmin:isAdmin
}

module.exports=authJwt;