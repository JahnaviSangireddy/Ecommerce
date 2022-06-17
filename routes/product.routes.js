/**
 * This file contains the routes for crud operations of product api
 */

const productController = require("../controllers/product.controller");
const {requestValidator} = require("../middlewares");

module.exports= function(app){
    //route to add a new product
    app.post("/ecom/api/v1/products/",[requestValidator.validateProductRequest],productController.create);

    //route to get products
    app.get("/ecom/api/v1/products/",productController.findAll)

    //route to get product baded on productId
    app.get("/ecom/api/v1/products/:id",productController.findOne);

    //route to update a product based on productId
    app.put("/ecom/api/v1/products/:id",[requestValidator.validateProductRequest],productController.update);
    
    //route to delete a product based on Id
    app.delete("/ecom/api/v1/products/:id",productController.delete);

    //route to get all products based on categoryId
    app.get("/ecom/api/v1/categories/:categoryId/products",productController.getProductsBasedOnCategory)
}