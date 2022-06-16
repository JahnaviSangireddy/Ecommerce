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

/**
 * to get all products based on productId
 */
exports.findOne = (req,res)=>{

    let productId = req.params.id;
    Product.findByPk(productId)
    .then(product =>{
        if(!product){
            return res.status(404).send({
                message:"Product not found"
            })
        }
        console.log("Successfully fetched products with id: "+productId);
        res.status(200).send(product);
    })
    .catch(err=>{
        console.log("some error while fetching product based on productId");
        res.status(500).send({
            message:"Internal error while fetching product based on productId"
        })
    })
}

//updating product based on Id
exports.update = (req,res)=>{

    let product ={
        name:req.body.name,
        description: req.body.description,
        cost:req.body.cost
    }

    let productId = req.params.id;

    Product.update(product,{
        where:{
            id:productId
        }
    })
    .then(updatedProduct =>{
        //Where the updation happened successfuly. 
        //You need to send the updated row to the table. 
        //But while fetching that row and sending it to user
        //there can be a error.
        console.log("successfully updated product in db");
        Product.findByPk(productId)
        .then(product=>{
            res.status(200).send(product)
        })
        .catch(err=>{
            res.status(500).send({
                message:"Error while getting updated product"
            })
        })
    })
    .catch(err=>{
        console.log("Error in upodating product");
        res.status(500).send({
            message:"Internal error while updating the product"
        })
    })
}

/**
 * deleting product based on id
 */
exports.delete = (req,res)=>{
    let product = {
        name:req.body.name,
        description: req.body.description,
        cost:req.body.cost
    }
    let productId= req.params.id;

    Product.destroy({
        where:{
            id:productId
        }
    })
    .then(result=>{
        console.log("successfully deleted the product");
        res.status(200).send({
            message:"deleted the product"
        })
    })
    .catch(err=>{
        console.log("Error while deleting the product");
        res.status(500).send({
            message:"Could not delete the product"
        })
    })
}