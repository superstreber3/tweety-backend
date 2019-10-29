import securePassword from "secure-password";
import app from "../app";
import { ResponseEnum } from "../Enum/ResponseEnum";
import { Logic } from "../Logic/Logic";
import { UserLogic } from "../Logic/UserLogic";
import {
  AvailableEmail,
  AvailableUsername,
  NoFirstname,
  NoLastname,
  NoMail,
  NoPassword,
  NotAvailableEmail,
  NotAvailableUsername,
  NoUserFound,
  NoUsername,
  NoUsernameOrMail,
  SuccessfullyCreated,
  NoId
} from "../Messages/UserLogicMessages";
import { User } from "../Object/UserObj";
import { UnexpectedError } from "../Messages/Messages";
import { ObjectID } from "bson";
const {
  base64decode
} = require("nodejs-base64");
// create a new express application instance
const pwd: any = new securePassword();
app.post("/createUser", function (req: any, res: any): any {
  if (req.body === undefined) {
    res.status(200).send(Logic.responseMsgBuilder(ResponseEnum.Error, UnexpectedError));
    return;
  }
  if (req.body.firstname === undefined) {
    res.status(200).send(Logic.responseMsgBuilder(ResponseEnum.Error, NoFirstname));
    return;
  }
  if (req.body.lastname === undefined) {
    res.status(200).send(Logic.responseMsgBuilder(ResponseEnum.Error, NoLastname));
    return;
  }
  if (req.body.username === undefined) {
    res.status(200).send(Logic.responseMsgBuilder(ResponseEnum.Error, NoUsername));
    return;
  }
  if (req.body.email === undefined) {
    res.status(200).send(Logic.responseMsgBuilder(ResponseEnum.Error, NoMail));
    return;
  }
  if (req.body.password === undefined) {
    res.status(200).send(Logic.responseMsgBuilder(ResponseEnum.Error, NoPassword));
    return;
  }
  var user: IUserInterface = new User(

    req.body.firstname,
    req.body.lastname,
    req.body.username,
    req.body.email,
    base64decode(req.body.password),
    false
  );
  var validate: any = UserLogic.validateUser(user);
  if (validate === true) {
    checkUsername(user.userName, function (value: any): any {
      if (value.type === ResponseEnum.Error) {
        res.status(200).send(value);
        return;
      } else {
        checkEmail(user.email, function (value: any): any {
          if (value.type === ResponseEnum.Error) {
            res.status(200).send(value);
            return;
          } else {
            pwd.hash(Buffer.from(user.password), function (err: any, hash: any): any {
              if (err || hash == null) {
                res.status(200).send(Logic.responseMsgBuilder(ResponseEnum.Error, UnexpectedError));
                return;
              }
              user.password = hash.toString();
              const l: Logic = new Logic();
              l.writeUserToDb(user, "Users", function (): any {
                l.readFromDb({ email: user.email }, "Users", function (value: any): any {
                  if (value !== undefined) {
                    if (value.password !== undefined) {
                      delete value.password;
                    }
                  }
                  req.session.user = value._id;
                  res.status(200).send(value);
                });
              });
            });
          }
        });
      }
    });
  } else {
    res.status(200).send(validate);
  }
});

console.log(" ↳'/createUser' started");

app.get("/checkUsername", function (req: any, res: any): any {
  var username: string = req.query.username;
  checkUsername(username, function (value: any): any {
    if (value.type === ResponseEnum.Error) {
      res.status(200).send(value);
    } else {
      res.status(200).send(value);
    }
  });
});


console.log(" ↳'/checkUsername' started");

app.get("/checkEmail", function (req: any, res: any): any {
  var email: string = req.query.email;
  checkEmail(email, function (value: any): any {
    if (value.type === ResponseEnum.Error) {
      res.status(200).send(value);
    } else {
      res.status(200).send(value);
    }
  });
});

console.log(" ↳'/checkEmail' started");

app.get("/getUser", function (req: any, res: any): any {
  var username: string = req.query.username;
  if (username === undefined) {
    res.status(200).send(Logic.responseMsgBuilder(ResponseEnum.Error, NoUsername));
    return;
  }
  username = username.trim().toLowerCase();
  var validateUsername: any = UserLogic.validateUsername(username);
  if (validateUsername !== true) {
    res.status(200).send(validateUsername);
    return;
  } else {
    const l: Logic = new Logic();
    l.readFromDb({
      userName: {
        $regex: new RegExp(username, "i")
      }
    }, "Users", function (value: any): any {
      if (value == null) {
        res.status(200).send(Logic.responseMsgBuilder(ResponseEnum.Error, NoUserFound));
        return;
      }
      res.status(200).send(value);
      return;
    });
  }
});

console.log(" ↳'/getUser' started");

app.get("/getUserWithId", function (req: any, res: any): any {
  var id: any = req.query.id;
  if (id === undefined) {
    res.status(200).send(Logic.responseMsgBuilder(ResponseEnum.Error, NoId));
    return;
  }
  try {
    id = new ObjectID(id);
    const l: Logic = new Logic();
    l.readFromDb({
      _id: id
    }, "Users", function (value: any): any {
      if (value == null) {
        res.status(200).send(Logic.responseMsgBuilder(ResponseEnum.Error, NoUserFound));
        return;
      }
      res.status(200).send(value);
      return;
    });
  } catch {
    res.status(200).send(Logic.responseMsgBuilder(ResponseEnum.Error, NoUserFound));
    return;
  }
});

console.log(" ↳'/getUserWithId' started");

app.post("/login", function (req: any, res: any): any {
  var username: string = req.body.username;
  var password: string = base64decode(req.body.password);
  var email: string = req.body.email;
  var validateUsername: any;
  var validateMail: any;
  var pwMail: any;
  if (username === undefined && email === undefined) {
    res.status(200).send(Logic.responseMsgBuilder(ResponseEnum.Error, NoUsernameOrMail));
    return;
  }
  if (password === undefined) {
    res.status(200).send(Logic.responseMsgBuilder(ResponseEnum.Error, NoPassword));
    return;
  }
  if (username !== undefined) {
    username = username.trim().toLowerCase();
    pwMail = username;
    validateUsername = UserLogic.validateUsername(username);
  }
  if (email !== undefined) {
    email = email.trim().toLowerCase();
    pwMail = email;
    validateMail = UserLogic.validateEmail(email);
  }
  if (validateUsername !== true && username !== undefined) {
    res.status(200).send(validateUsername);
    return;
  } else if (validateMail !== true && email !== undefined) {
    res.status(200).send(validateMail);
    return;
  } else {
    const ul: UserLogic = new UserLogic();
    ul.validatePasswordMatch(password, pwMail, function (value: any): any {
      if (value.type === ResponseEnum.Success) {
        req.session.user = value.message._id;
        delete value.message.password;
        res.status(200).send(value);
      } else {
        res.status(200).send(Logic.responseMsgBuilder(ResponseEnum.Error, "false"));
      }
      return;
    });
  }
});

console.log(" ↳'/login' started");

app.get("/loggedin", function (req: any, res: any): any {
  if (req.session !== undefined) {
    if (req.session.user !== undefined) {
      res.status(200).send(Logic.responseMsgBuilder(ResponseEnum.Success, req.session.user));
    } else {
      res.status(200).send(false);
    }
  }
});

console.log(" ↳'/loggedin' started");

function checkEmail(email: string, callback: any): any {
  if (email === undefined) {
    callback(Logic.responseMsgBuilder(ResponseEnum.Error, NoMail));
    return;
  }
  email = email.trim().toLowerCase();
  var validateEmail: any = UserLogic.validateEmail(email);
  if (validateEmail !== true) {
    callback(validateEmail);
    return;
  } else {
    const l: Logic = new Logic();
    l.readFromDb({
      email: {
        $regex: new RegExp(email, "i")
      }
    }, "Users", function (value: any): any {
      if (value == null) {
        callback(Logic.responseMsgBuilder(ResponseEnum.Success, AvailableEmail));
        return;
      }
      callback(Logic.responseMsgBuilder(ResponseEnum.Error, NotAvailableEmail));
      return;
    });
  }
}

function checkUsername(username: string, callback: any): any {
  if (username === undefined) {
    callback(Logic.responseMsgBuilder(ResponseEnum.Error, NoUsername));
    return;
  }
  username = username.trim().toLowerCase();
  var validateUsername: any = UserLogic.validateUsername(username);
  if (validateUsername !== true) {
    callback(validateUsername);
    return;
  } else {
    const l: Logic = new Logic();
    l.readFromDb({
      userName: {
        $regex: new RegExp(username, "i")
      }
    }, "Users", function (value: any): any {
      if (value == null) {
        callback(Logic.responseMsgBuilder(ResponseEnum.Success, AvailableUsername));
        return;
      }
      callback(Logic.responseMsgBuilder(ResponseEnum.Error, NotAvailableUsername));
      return;
    });
  }
}

console.log(" ✅");