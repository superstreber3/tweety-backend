"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var UserLogic_1 = require("./Logic/UserLogic");
var app;
app = express();
exports.default = app;
UserLogic_1.UserLogic.writeUserToDb();
console.log("Starting User API...");
require('./ApiFunction/UserApi');
app.listen(3000, function () {
    console.log("API started succsesfully");
});
