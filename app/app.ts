import express = require('express');
import { UserLogic } from './Logic/UserLogic';

var app: express.Application;
app = express();
export default app;
UserLogic.writeUserToDb();
console.log("Starting User API...");
require('./ApiFunction/UserApi');
app.listen(3000, function () {
    console.log("API started succsesfully");
  });

 