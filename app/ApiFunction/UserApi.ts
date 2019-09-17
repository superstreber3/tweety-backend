import securePassword from 'secure-password';
import app from '../app';
import {
  UserLogic
} from '../Logic/UserLogic';
import {
  User
} from '../Object/UserObj';
import {
  ResponseEnum
} from '../Enum/ResponseEnum';
import {
  UnexpectedError,
  NoMail,
  NoFirstname,
  NoLastname,
  NoUsername,
  NoPassword,
  NotAvailableUsername,
  SuccessfullyCreated,
  AvailableUsername,
  AvailableEmail,
  NotAvailableEmail,
  NoUserFound,
  NoUsernameOrMail
} from '../Messages/UserLogicMessages';
import { Logic } from '../Logic/Logic';
const {
  base64decode
} = require('nodejs-base64');
// Create a new express application instance
const pwd = new securePassword();
app.post('createUser', function (req, res) {
  if (req.body == undefined) {
    res.send(Logic.responseMsgBuilder(ResponseEnum.Error, UnexpectedError));
    return
  }
  if (req.body.firstname == undefined) {
    res.send(Logic.responseMsgBuilder(ResponseEnum.Error, NoFirstname));
    return
  }
  if (req.body.lastname == undefined) {
    res.send(Logic.responseMsgBuilder(ResponseEnum.Error, NoLastname));
    return
  }
  if (req.body.username == undefined) {
    res.send(Logic.responseMsgBuilder(ResponseEnum.Error, NoUsername));
    return
  }
  if (req.body.email == undefined) {
    res.send(Logic.responseMsgBuilder(ResponseEnum.Error, NoMail));
    return
  }
  if (req.body.password == undefined) {
    res.send(Logic.responseMsgBuilder(ResponseEnum.Error, NoPassword));
    return
  }
  var user: userInterface = new User(

    req.body.firstname,
    req.body.lastname,
    req.body.username,
    req.body.email,
    base64decode(req.body.password),
    false
  );
  var validate = UserLogic.validateUser(user);
  if (validate == true) {
    checkUsername(user.userName, function (value: any) {
      if (value["type"] == ResponseEnum.Error) {
        res.send(value);
        return;
      } else {
        checkEmail(user.email, function (value: any) {
          if (value["type"] == ResponseEnum.Error) {
            res.send(value);
            return;
          } else {
            pwd.hash(Buffer.from(user.password), function (err, hash) {
              if (err || hash == null) {
                res.send(Logic.responseMsgBuilder(ResponseEnum.Error, UnexpectedError));
                return;
              }
              user.password = hash.toString();
              const ul = new UserLogic()
              ul.writeUserToDb(user, function () {
                res.send(Logic.responseMsgBuilder(ResponseEnum.Success, SuccessfullyCreated))
              });
            });
          }
        });
      }
    });
  } else {
    res.send(validate);
  }
});

console.log(" ↳'/createUser' started");

app.get('/checkUsername', function (req, res) {
  var username = req.query.username
  checkUsername(username, function (value: any) {
    res.send(value);
  });
});

console.log(" ↳'/checkUsername' started");

app.get('/checkEmail', function (req, res) {
  var email = req.query.email
  checkEmail(email, function (value: any) {
    res.send(value);
  });
});

console.log(" ↳'/checkEmail' started");

app.get('/getUser', function (req, res) {
  var username = req.query.username;
  if (username == undefined) {
    res.send(Logic.responseMsgBuilder(ResponseEnum.Error, NoUsername));
    return;
  }
  username = username.trim().toLowerCase()
  var validateUsername = UserLogic.validateUsername(username);
  if (validateUsername != true) {
    res.send(validateUsername);
    return;
  } else {
    const ul = new UserLogic();
    ul.readFromDb({
      userName: {
        $regex: new RegExp(username, "i")
      }
    }, function (value: any) {
      if (value == null) {
        res.send(Logic.responseMsgBuilder(ResponseEnum.Error, NoUserFound));
        return;
      }
      res.send(Logic.responseMsgBuilder(ResponseEnum.Success, value));
      return;
    });
  }
});

console.log(" ↳'/getUser' started");

app.get('/login', function (req: any, res) {
  var username = req.query.username;
  var password = base64decode(req.query.password);
  var email = req.query.email;
  var validateUsername;
  var validateMail;
  var pwMail;
  if (username == undefined && email == undefined) {
    res.send(Logic.responseMsgBuilder(ResponseEnum.Error, NoUsernameOrMail));
    return;
  }
  if (password == undefined) {
    res.send(Logic.responseMsgBuilder(ResponseEnum.Error, NoPassword));
    return;
  }
  if (username != undefined) {
    username = username.trim().toLowerCase();
    pwMail = username;
    validateUsername = UserLogic.validateUsername(username);
  }
  if (email != undefined) {
    email = email.trim().toLowerCase();
    pwMail = email;
    validateMail = UserLogic.validateEmail(email);
  }
  if (validateUsername != true && username != undefined) {
    res.send(validateUsername);
    return;
  } else if (validateMail != true && email != undefined) {
    res.send(validateMail);
    return;
  } else {
    const ul = new UserLogic();
    ul.validatePasswordMatch(password, pwMail, function (value: any) {
      if (value["type"] == ResponseEnum.Success) {
        req.session.user = value["message"]["_id"];
        delete value["message"]["password"];
        res.send(value);
      } else {
        res.send(Logic.responseMsgBuilder(ResponseEnum.Error, "false"))
      }
      return;
    });
  }
});

console.log(" ↳'/login' started");

app.get('/loggedin', function (req: any, res) {
  if (req.session != undefined) {
        if(req.session.user != undefined){
          res.send(Logic.responseMsgBuilder(ResponseEnum.Success, req.session.user));
        }else{
          res.send(false);
        }
  }
});

console.log(" ↳'/loggedin' started");

function checkEmail(email: string, callback: any) {
  if (email == undefined) {
    callback(Logic.responseMsgBuilder(ResponseEnum.Error, NoMail));
    return;
  }
  email = email.trim().toLowerCase();
  var validateEmail = UserLogic.validateEmail(email);
  if (validateEmail != true) {
    callback(validateEmail);
    return;
  } else {
    const ul = new UserLogic();
    ul.readFromDb({
      email: {
        $regex: new RegExp(email, "i")
      }
    }, function (value: any) {
      if (value == null) {
        callback(Logic.responseMsgBuilder(ResponseEnum.Success, AvailableEmail));
        return;
      }
      callback(Logic.responseMsgBuilder(ResponseEnum.Error, NotAvailableEmail));
      return;
    });
  }
}

console.log(" ↳'/checkEmail' started");

function checkUsername(username: string, callback: any) {
  if (username == undefined) {
    callback(Logic.responseMsgBuilder(ResponseEnum.Error, NoUsername));
    return;
  }
  username = username.trim().toLowerCase();
  var validateUsername = UserLogic.validateUsername(username);
  if (validateUsername != true) {
    callback(validateUsername);
    return;
  } else {
    const ul = new UserLogic();
    ul.readFromDb({
      userName: {
        $regex: new RegExp(username, "i")
      }
    }, function (value: any) {
      if (value == null) {
        callback(Logic.responseMsgBuilder(ResponseEnum.Success, AvailableUsername));
        return;
      }
      callback(Logic.responseMsgBuilder(ResponseEnum.Error, NotAvailableUsername));
      return;
    });
  }
}

console.log(" ↳'/checkUsername' started");

console.log("Done");