/**
 * This file is used to represent the Product schema
 * Product fields:
 * 1.id
 * 2.name
 * 3.description
 * 4. cost
 */

module.exports = (sequelize,Sequelize)=>{
    const product = sequelize.define("product",{

        id:{
            type: Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        name:{
            type:Sequelize.STRING,
            allowsNull:false
        },
        description:{
            type:Sequelize.STRING
        },
        cost:{
            type:Sequelize.INTEGER,
            allowsNull:false
        }
    })
    {
        tableName: products
    }

    return product;
}