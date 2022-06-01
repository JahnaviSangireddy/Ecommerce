/**
 * This file contains controller logic for the category
 * resource
 * Everytime a CRUD request comes for category the methods in this file get executed
 */

const req = require('express/lib/request');
const res = require('express/lib/response');
const db = require('../models');
const Category = db.category;

/**
 * POST : To create and save a category obj
 */

exports.create= (req,res)=>{

    /**
     * validation od request body
     */

    if(!req.body.name){
        res.status(400).send({
            message:'Name of the category cant be empty'
        })
        return;
    }
    /**
     * creation of category obj to be stored in db
     */
    const category = {
        name: req.body.name,
        decsription: req.body.decsription
    };

    Category.create(category).
    then(category=>{
        console.log(`category name : ${category.name} got inserted successfully`);
        res.status(201).send(category);
    }).
    catch(err=>{
        console.log()
        console.log()
        res.status(500).send({
            message: "some internal error while storing data in db"
        })
    });
}

/**
 * Get list of all categories
 */

exports.findAll= (req,res)=>{

    let categoryName = req.query.name;
    let promise;

if(categoryName){
    promise = Category.findAll({
        where:{
            name : categoryName
        }
    });
}else{
    promise = Category.findAll();
}

promise.then(categories=>{

    res.status(200),send(categories)
}).catch(err=>{
    res.status(500).send({
        message:"some internal error while fetching categories"
    })
})
}

/**
 * Get a category based on Id
 */

exports.findOne=(req,res)=>{

    const categoryId = req.params.id;
    Category.findByPk(categoryId)
    .then(category=>{
        res.status(200).send(category)
    })
    .catch(err=>{
        res.status(500).send({
            message:"Some internal error while fetching category based on Id"
        })
    })
}

/**
 * Update the existing category
 */

exports.update= (req,res)=>{

    const category = {
        name: req.body.name,
        decsription: req.body.decsription
    }
    const categoryId = req.params.id;

    Category.update(category,{
        where:{
            id:categoryId
        }
    })
    .then(updatedCategory=>{
        //when updation happened successfully
        //you need to send updated row to user
        //error can occur when fetching the updated row
        Category.findByPk(categoryId)
        .then(category=>{
            res.status(200).send(category);
        })
        .catch(err=>{
            res.status(500).send({
                message:"some internal error while fetching the updated category"
            })
        }           
        )
    })
    .catch(err=>{
        res.status(500).send({
            message:"some internal error while updating the category"
        })
    }
    )
}

