/**
 * This file contains the routes for crud operations of product api
 */

const productController = require("../controllers/product.controller");

module.exports= function(app){
    //route to add a new product
    app.post("/ecom/api/v1/products/",productController.create);
    //route to get products
    app.get("/ecom/api/v1/products/",productController.findAll)
}