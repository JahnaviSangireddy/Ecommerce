const controller =  require("../controllers/auth.controller");

module.exports = function(app){
    app.post("/ecom/api/v1/auth/signUp",[],controller.signUp);

    app.post("/ecom/api/v1/auth/signIn",[],controller.signIn);
}