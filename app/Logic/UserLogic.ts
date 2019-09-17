import * as EmailValidator from "email-validator";
import securePassword from "secure-password";
import { ResponseEnum } from "../Enum/ResponseEnum";
import { InvalidMail, InvalidPassword, InvalidUsername, ShortUsername } from "../Messages/UserLogicMessages";
import { User } from "../Object/UserObj";
import { Logic } from "./Logic";
import { passwordRegex, usernameRegex } from "./regex";
const pwd: any = new securePassword();

export class UserLogic {
     static validateUser(user: User): any {
          var validatePassword: any = this.validatePassword(user.password);
          var validateUsername: any = this.validateUsername(user.userName);
          var validateEmail: any = this.validateEmail(user.email);
          if (validateEmail !== true) {
               return validateEmail;
          }
          if (validateUsername !== true) {
               return validateUsername;
          }
          if (validatePassword !== true) {
               return validatePassword;
          }
          return true;

     }
     static validatePassword(email: string): any {
          if (!email.match(passwordRegex)) {
               return Logic.responseMsgBuilder(ResponseEnum.Error, InvalidPassword);
          }
          return true;
     }
     async validatePasswordMatch( pw: string, searchValue: string, callback: any): Promise<any> {
          const l: Logic = new Logic();
          if (searchValue.includes("@")) {
               l.readFromDb({
                    email: {
                         $regex: new RegExp(searchValue, "i")
                    }
               }, "Users", function (valueE: any): any {
                    if (valueE == null) {
                         callback(Logic.responseMsgBuilder(ResponseEnum.Error, "false"));
                    } else {
                         UserLogic.verfiyPw(valueE.password, pw, function (value2E: any): any {
                              if (value2E) {
                                   callback(Logic.responseMsgBuilder(ResponseEnum.Success, valueE));
                              } else {
                                   callback(Logic.responseMsgBuilder(ResponseEnum.Error, "false"));
                              }
                         });
                    }
               });
          } else {
               l.readFromDb({
                    userName: {
                         $regex: new RegExp(searchValue, "i")
                    },
               }, "Users", function (valueU: any): any {
                    if (valueU == null) {
                         console.log(1);
                         callback(Logic.responseMsgBuilder(ResponseEnum.Error, "false"));
                    } else {
                         UserLogic.verfiyPw(valueU.password, pw, function (value2U: any): any {
                              if (value2U) {
                                   callback(Logic.responseMsgBuilder(ResponseEnum.Success, valueU));
                              } else {
                                   callback(Logic.responseMsgBuilder(ResponseEnum.Error, "false"));
                              }
                         });
                    }
               });
          }
     }
     static validateUsername(username: string): any {
          if (username.length < 5) {
               return Logic.responseMsgBuilder(ResponseEnum.Error, ShortUsername);
          }
          if (username.match(usernameRegex)) {
               return Logic.responseMsgBuilder(ResponseEnum.Error, InvalidUsername);
          }
          return true;
     }
     static validateEmail(email: string): any {
          if (!EmailValidator.validate(email)) {
               return Logic.responseMsgBuilder(ResponseEnum.Error, InvalidMail);
          }
          return true;
     }
     static verfiyPw(hash: string, pw: string, callback: any): any {
          pwd.verify(Buffer.from(pw), Buffer.from(hash), function (err: any, result: any): any {
               if (err) { throw err; }
               switch (result) {
                    case securePassword.INVALID_UNRECOGNIZED_HASH:
                         callback(false);
                         break;
                    case securePassword.INVALID:
                         console.log(pw);
                         callback(false);
                         break;
                    case securePassword.VALID:
                         callback(true);
                         break;
                    case securePassword.VALID_NEEDS_REHASH:
                         callback(true);
                         break;
               }
          });
     }
}