const categoryController = require("../controllers/category.controller");

module.exports = function(app){

    //route to add a new category
    app.post("/ecom/api/v1/categories",categoryController.create);

    //route to get all categories
    app.get("/ecom/api/v1/categories",categoryController.findAll);

    //route to get category based on id
    app.get("/ecom/api/v1/categories/:id",categoryController.findOne);

    //route to update category based on id
    app.put("/ecom/api/v1/categories/:id",categoryController.update);

    //route to delete category based on id
    app.delete("/ecom/api/v1/categories/:id",categoryController.delete);
}