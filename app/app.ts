import express = require('express');
var bodyParser = require('body-parser')

var app: express.Application;
app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
export default app;
console.log("Starting User API...");
require('./ApiFunction/UserApi');
app.listen(3000, function () {
  console.log("API started succsesfully");
});