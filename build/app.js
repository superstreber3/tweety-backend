"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app;
app = express();
exports.default = app;
console.log("Starting User API...");
require('./ApiFunction/UserApi');
app.listen(3000, function () {
    console.log("API started succsesfully");
});
