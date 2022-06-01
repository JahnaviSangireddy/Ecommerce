/**
 * This file is used to represent the Category schema
 * category fields:
 * 1.id
 * 2.name
 * 3.description
 */

module.exports = (sequelize,Sequelize)=>{

    const Category = sequelize.define("Category",{
        id:{
            type: Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement: true
        },
        name:{
            type:Sequelize.STRING,
            allowsNull: false
        },
        description:{
            type:Sequelize.STRING
        }
    });
    return Category;
}

