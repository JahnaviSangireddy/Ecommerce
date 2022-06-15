/**
 * This file contains the logic for crud operations that can be done on product api
 * whenever the request comes the particular logic will be executed
 */

const db = require("../models");
const Product = db.product;

/**
 * logic to add a new product to db
 */

exports.create = (req,res)=>{
    if(!req.body.name){
        console.log("product name is empty");
        res.status(400).send({
            message:"The name of product can't be empty"
        })
        return;
    }

    if(!req.body.cost){
        console.log("product cost is empty");
        res.status(400).send({
            message:"The cost of product can't be empty"
        })
        return;
    }

    const product={
        name: req.body.name,
        description: req.body.description,
        cost: req.body.cost
    }

    Product.create(product)
    .then(product=>{
        console.log(`successfully added the product [${product.name}] in db`);
        res.status(200).send(product);
    })
    .catch(err=>{
        console.log(`Issue in adding product [${product.name}] to db`);
        res.status(500).send({
            message:"Internal issue in adding product to db"
        })
    })
}

/**
 * get all products
 */

exports.findAll = (req,res)=>{
 
    let promise;
    let productName = req.query.name;
    if(productName){
        promise = Product.findAll({
            where:{
                name:productname
            }
        })

    }else{
        promise =Product.findAll();
    }

    promise
    .then(products =>{
        console.log("Products fetched successfully");
        res.status(200).send(products)
    })
    .catch(err=>{
        console.log("some error in fetching categories");
        res.status(500).send({
            message:"Internal error while fetching categories"
        })
        
    })
}