import securePassword from 'secure-password';
import app from '../app';
import { UserLogic } from '../Logic/UserLogic';
import { User } from '../Object/UserObj';
import { ResponseEnum } from '../Enum/ResponseEnum';
import { UnexpectedError, NoMail, NoFirstname, NoLastname, NoUsername, NoPassword, NotAvailableUsername, SuccessfullyCreated, AvailableUsername, AvailableEmail, NotAvailableEmail } from '../Messages/UserLogicMessages';
// Create a new express application instance
const pwd = new securePassword();
app.post('/createUser', function (req, res) {
  if (req.body == undefined) {
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
    req.body.password,
    false
  );
  var validate = UserLogic.validateUser(user);
  if (validate == true) {
    pwd.hash(Buffer.from(user.password), function (err, hash) {
      if (err || hash == null){
        res.send(UserLogic.responseMsgBuilder(ResponseEnum.Error, UnexpectedError));
        return;
      }
    user.password = hash.toString();
      const ul = new UserLogic()
      ul.writeUserToDb(user, function(){
        res.send(UserLogic.responseMsgBuilder(ResponseEnum.Success, SuccessfullyCreated))
      });
    });
  } else {
    res.send(validate);
  }
});

app.get('/checkUsername', function (req, res) {
  var username = req.query.username.trim().toLowerCase();
  if (username == undefined) {
    res.send(UserLogic.responseMsgBuilder(ResponseEnum.Error, NoUsername));
    return;
  }
  var validateUsername = UserLogic.validateUsername(username);
  if (validateUsername != true) {
    res.send(validateUsername);
    return;
  } else {
    const ul = new UserLogic();
    ul.readFromDb({ userName: username }, function (value: any) {
      if (value == null) {
        res.send(UserLogic.responseMsgBuilder(ResponseEnum.Success, AvailableUsername));
        return;
      }
      res.send(UserLogic.responseMsgBuilder(ResponseEnum.Error, NotAvailableUsername));
      return;
    });
  }

});
app.get('/checkEmail', function (req, res) {
  var email = req.query.email.trim().toLowerCase();
  if (email == undefined) {
    res.send(UserLogic.responseMsgBuilder(ResponseEnum.Error, NoMail));
    return;
  }
  var validateEmail = UserLogic.validateEmail(email);
  if (validateEmail != true) {
    res.send(validateEmail);
    return;
  } else {
    const ul = new UserLogic();
    ul.readFromDb({ email: email }, function (value: any) {
      if (value == null) {
        res.send(UserLogic.responseMsgBuilder(ResponseEnum.Success, AvailableEmail));
        return;
      }
      res.send(UserLogic.responseMsgBuilder(ResponseEnum.Error, NotAvailableEmail));
      return;
    });
  }
});
app.get('/getUser', function (req, res) {
  //send(UserLogic.createUser(user));
});
console.log("Done");