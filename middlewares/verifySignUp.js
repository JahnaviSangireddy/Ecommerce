const db = require("../models");
const ROLES = db.ROLES;
const User  = db.user;
const Role = db.role;

checkDuplicateNameOrEmail = (req,res,next)=>{

    console.log("Inside checkDuplicateNameOrEmail middleware");

    User.findOne({
        where:{
            userName:req.body.userName
        }
    })
    .then(user=>{
        if(user){
            return res.status(400).send({
                message:"Username is already in use"
            })
        }
        User.findOne({
            where:{
                email:req.body.email
            }
        })
        .then(user=>{
            if(user){
                return res.status(400).send({
                    message:"User already exists"
                })
            }
        })
    })
    console.log("User is valid");
    next();
}

checkIfRoleExists = (req,res,next)=>{

    console.log("Inside checkIfRoleExists middleware");
    for(let i=0;i<req.body.roles.length;i++){
       // console.log(req.body.roles[i]);
        //console.log(ROLES.includes(req.body.roles[i]));
        if(!ROLES.includes(req.body.roles[i])){
            res.status(400).send({
                message:"Role does not exist"
            })
            return;
        }
    }
    next();
}

const verifySignUp = {
    checkDuplicateNameOrEmail : checkDuplicateNameOrEmail,
    checkIfRoleExists : checkIfRoleExists
}

module.exports= verifySignUp;