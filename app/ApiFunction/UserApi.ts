import app from '../app';
import {UserLogic} from '../Logic/UserLogic'
// Create a new express application instance

app.post('/createUser', function (req, res) {
  //Parse User
  var user: userInterface = new User(
    req.body.firstname,
    req.body.lastname,
    req.body.username,
    req.body.email,
    req.body.password
  );
  if(UserLogic.isUserNotNull(user)){
  if(UserLogic.validateUser(user)){
    //UserLogic.writeUserToDb(user);
  }
  res.send(UserLogic.createUser(user));
  }
});

app.get('/getUser', function (req, res) {
//send(UserLogic.createUser(user));
});
console.log("Done");