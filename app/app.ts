import express = require('express');
var bodyParser = require('body-parser');
var expressSession = require('express-session')
var MongoDBStore = require('connect-mongodb-session')(expressSession);
const uuidv1 = require('uuid/v1');
var cookieParser = require('cookie-parser');
var app: express.Application;
app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser());
var store = new MongoDBStore({
  uri: 'mongodb://localhost:27017/Tweety',
  collection: 'sessions'
});
app.use(expressSession({store: store, secret: 'qmX\*N{38o@xKi;h=Sas.MN-M*T;', saveUninitialized: true, resave: false, cookie: {
  maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
},}))
export default app;
console.log("Starting User API...");
require('./ApiFunction/UserApi');
console.log("Starting Tweety API...");
require('./ApiFunction/TweetApi');
console.log("Starting Topic API...");
require('./ApiFunction/TopicApi');
app.listen(3000, function () {
  console.log("API started succsesfully");
});