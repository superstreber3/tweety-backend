"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __importDefault(require("../app"));
var UserLogic_1 = require("../Logic/UserLogic");
// Create a new express application instance
app_1.default.post('/createUser', function (req, res) {
    //Parse User
    var user = new User(req.body.firstname, req.body.lastname, req.body.username, req.body.email, req.body.password);
    if (UserLogic_1.UserLogic.isUserNotNull(user)) {
        if (UserLogic_1.UserLogic.validateUser(user)) {
            //UserLogic.writeUserToDb(user);
        }
        res.send(UserLogic_1.UserLogic.createUser(user));
    }
});
app_1.default.get('/getUser', function (req, res) {
    //send(UserLogic.createUser(user));
});
console.log("Done");
