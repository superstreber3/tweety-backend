import express = require('express');
var app: express.Application;
app = express();
export default app;
console.log("Starting User API...");
require('./ApiFunction/UserApi');
app.listen(3000, function () {
    console.log("API started succsesfully");
  });

 