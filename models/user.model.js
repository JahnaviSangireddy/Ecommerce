const { sequelize, Sequelize } = require(".");

module.exports = (sequelize,Sequelize)=>{
    const User = sequelize.define("users",{
        userId:{
            type:Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey:true,
            allowsNull:false
        },
        userName:{
            type: Sequelize.STRING,
        },
        email:{
            type:Sequelize.STRING
        },
        password:{
            type: Sequelize.STRING
        }
    });
    return User;
}