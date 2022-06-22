/**
* This file will be used for the following purpose: 
*
* 1. Create the DB connection with the help of sequelize
* 2. Export all the functionalities of the model through the file. 
* 
* One of the advantages of using index.js file is, other file
* trying to import this file, just need to provide the
* module name.
*
*/

const config = require("../configs/db.configs");
const Sequelize = require("sequelize");

/**
 * creating db connection
 */

const seq = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
       host: config.HOST,
       dialect: config.dialect
    }
);

const db={};

db.Sequelize = Sequelize;
db.sequelize = seq;
db.category = require('./category.model.js')(seq,Sequelize);
db.product = require('./product.model.js')(seq,Sequelize);
db.user= require('./user.model.js')(seq,Sequelize);
db.role = require('./role.model.js')(seq,Sequelize);

/**
 * now db object will have 3 attributes
 *  Sequelize
 *  sequelize
 *  category->this is a call to function which returns the schema of Category
 * product-> this is a call to function which returns the schema of product
 */

db.role.belongsToMany(db.user,{
    through:"user_roles",
    foreignKey:"roleId"
});

db.user.belongsToMany(db.role,{
    through:"user_roles",
    foreignKey:"userId"
})

db.ROLES = ["user","Admin"]
module.exports=db;