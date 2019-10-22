import express = require("express");
var bodyParser: any = require("body-parser");
var expressSession: any = require("express-session");
var MongoDBStore: any = require("connect-mongodb-session")(expressSession);
var cookieParser: any = require("cookie-parser");
var app: express.Application;
app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
var store: any = new MongoDBStore({
  uri: "mongodb://localhost:27017/Tweety",
  collection: "sessions"
});
function myCors(req: any, res: any, nxt: any): any {
        res.header("Access-Control-Allow-Origin", "http://localhost:3001");
        res.header("Access-Control-Allow-Headers", "Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization");
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT ,DELETE");
        res.header("Access-Control-Allow-Credentials", true);
  nxt();
}
app.use(myCors);
app.use(expressSession({
  store: store, secret: "qmX\*N{38o@xKi;h=Sas.MN-M*T;", saveUninitialized: true, resave: false
}));
export default app;
console.log("Starting User API...");
require("./ApiFunction/UserApi");
console.log("Starting Tweety API...");
require("./ApiFunction/TweetApi");
console.log("Starting Topic API...");
require("./ApiFunction/TopicApi");
app.listen(3000, function (): any {
  console.log("API started succsesfully");
});