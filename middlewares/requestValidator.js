const db = require("../models");
const Category = db.category;

const validateCategoryRequest = (req,res,next)=>{
    if(!req.body.name){
      return  res.status(400).send({
            message:"Category name cannot be empty!!! Please add it"
        })
    }
    next();
}

const validateProductRequest = (req,res,next)=>{
    if(!req.body.name){
        return res.status(400).send({
            message:"Product name cannot be empty"
        })
    }
    if(!req.body.cost){
        return res.status(400).send({
            message:"Cost of product cannot be empty"
        })
    }
    if(req.body.CategoryId){
        Category.findByPk(req.body.CategoryId)
        .then(category=>{
            if(!category){
                res.status(404).send({
                    message:"Category not found in db"
                })
                return;
            }
        })
        .catch(err=>{
            res.status(500).send({
                message:"Some error occured while fetching category details related to thid product"
            })
        })

    }else{
        res.status(400).send({
            message:"CategoryId cannot be empty"
        })
    }
    next();
}

module.exports = {
    validateCategoryRequest : validateCategoryRequest,
    validateProductRequest: validateProductRequest
}