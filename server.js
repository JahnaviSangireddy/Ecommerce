const express = require('express');
const serverConfig = require('./configs/server.config');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

/**
 * Initialising the db
 */

const db = require("./models");
const category = db.category;

db.sequelize.sync({force:true})
.then(()=>{
    console.log("tables are droped and created");
    init();
})

function init(){
    var categories = [
        {
            name:"Electronics",
            description:"This category is releated to electronics products"
        },
        {
            name:"KitchenItems",
            description:"This category is releated to Kitchen products"
        }
    ];
    category.bulkCreate(categories)
    .then(()=>{
        console.log("category table initialised");
    })
    .catch(err=>{
        console.log("error while initialising category table");
    })

}

require("./routes/category.routes")(app);

app.listen(serverConfig.PORT,()=>{
    console.log(`Application started on port no : ${serverConfig.PORT}`);
})