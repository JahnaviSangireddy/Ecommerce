const db = require("../models");
const config = require("../configs/auth.configs");
const User = db.user;
var jwt = require("jsonwebtoken");


verifyToken = (req,res,next)=>{

}

isAdmin = (req,res,next)=>{

}

const authJwt={
    verifyToken:verifyToken,
    isAdmin:isAdmin
}

module.exports=authJwt;