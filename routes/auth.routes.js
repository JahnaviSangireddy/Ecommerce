const controller =  require("../controllers/auth.controller");
const {verifySignUp} = require("../middlewares")

module.exports = function(app){
    app.post("/ecom/api/v1/auth/signUp",[verifySignUp.checkDuplicateNameOrEmail,verifySignUp.checkIfRoleExists],controller.signUp);

    app.post("/ecom/api/v1/auth/signIn",[],controller.signIn);
}