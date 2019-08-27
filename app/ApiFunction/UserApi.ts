import app from '../app';
import { UserLogic } from '../Logic/UserLogic';
import { User } from '../Object/UserObj';
import { ResponseEnum } from '../Enum/ResponseEnum';
import {UnexpectedError, NoMail, NoFirstname, NoLastname, NoUsername, NoPassword} from '../Messages/UserLogicMessages';
// Create a new express application instance

app.post('/createUser', function (req, res) {
if(req.body == undefined){
  res.send(UserLogic.responseMsgBuilder(ResponseEnum.Error, UnexpectedError));
  return
}
  if (req.body.firstname == undefined) {
    res.send(UserLogic.responseMsgBuilder(ResponseEnum.Error, NoFirstname));
    return
  }
  if (req.body.lastname == undefined) {
    res.send(UserLogic.responseMsgBuilder(ResponseEnum.Error, NoLastname));
    return
  }
  if (req.body.username == undefined) {
    res.send(UserLogic.responseMsgBuilder(ResponseEnum.Error, NoUsername));
    return
  }
  if (req.body.email == undefined) {
    res.send(UserLogic.responseMsgBuilder(ResponseEnum.Error, NoMail));
    return
  }
  if (req.body.password == undefined) {
    res.send(UserLogic.responseMsgBuilder(ResponseEnum.Error, NoPassword));
    return
  }
  var user: userInterface = new User(

    req.body.firstname,
    req.body.lastname,
    req.body.username,
    req.body.email,
    req.body.password
  );
  var validate = UserLogic.validateUser(user);
  if (validate == true) {
      const ul = new UserLogic()
      ul.writeUserToDb(user, function(){
        res.send(ResponseEnum.Success, )
      });
  } else {
    res.send(validate);
  }
});

app.get('/getUser', function (req, res) {
  //send(UserLogic.createUser(user));
});
console.log("Done");