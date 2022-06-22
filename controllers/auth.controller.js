const db = require("../models");
const config = require("../configs/auth.configs");

const User = db.user;
const Role = db.role;
const op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signUp = (req,res)=>{

    console.log("Inside Auth controller");
    User.create({
        userName:req.body.userName,
        email:req.body.email,
        password:bcrypt.hashSync(req.body.password,8)
    })
    .then(user=>{
        console.log("User data entered in user table");
        if(req.body.roles){
            Role.findAll({
                where:{
                    name:{
                        [op.or]: req.body.roles
                    }                   
                }
            })
            .then(roles=>{
                user.setRoles(roles)
                .then(res.status(200).send({
                    message:"User registered sucessfully"
                }))
            })
        }else{
            user.setRoles([1])
            .then(res.status(200).send({
                message:"User registered sucessfully"
            }))
        }
    })
    .catch(err=>{
        res.status(500).message({
            message:err.message
        })
    })
}

exports.signIn = (req,res)=>{

    User.findOne({
        where:{
            userName:req.body.userName
        }
    })
    .then(user=>{
        if(!user){
          return  res.status(404).send({message:"User not found"})
        }
        var isPasswordValid = bcrypt.compareSync(req.body.password,user.password);
        if(!isPasswordValid){
           return  res.status(401).send({message:"Invalid password"})
        }
        var token = jwt.sign({id:user.id},config.seceret,{
            expiresIn:86400
        });
        res.status(200).send({
            id:user.id,
            username:user.userName,
            email: user.email,
            accessToken:token
        });
    })
    .catch(err=>{
        res.status(500).send({
            message:err.message
        })
    })

}