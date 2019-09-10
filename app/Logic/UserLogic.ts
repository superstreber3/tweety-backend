import * as EmailValidator from 'email-validator';
import { DatabseLogic } from './DatabaseLogic';
import { ResponseEnum } from '../Enum/ResponseEnum';
import { User } from '../Object/UserObj';
import { ResponseObj } from '../Object/ResponseObj'
import { InvalidMail, ShortUsername, InvalidUsername, InvalidPassword, WrongHash } from '../Messages/UserLogicMessages'
import { usernameRegex, passwordRegex } from './regex';
import { unwatchFile } from 'fs';
import securePassword from 'secure-password';
const pwd = new securePassword();

export class UserLogic {
     static validateUser(user: User) {
          var validatePassword = this.validatePassword(user.password);
          var validateUsername = this.validateUsername(user.userName);
          var validateEmail = this.validateEmail(user.email);
          if (validateEmail != true)
               return validateEmail;
          if (validateUsername != true)
               return validateUsername;
          if (validatePassword != true)
               return validatePassword;
          return true;

     };
     static validatePassword(email: string) {
          if (!email.match(passwordRegex))
               return this.responseMsgBuilder(ResponseEnum.Error, InvalidPassword)
          return true;
     }
     async validatePasswordMatch(pw: string, searchValue: string, callback: any) {
          if (searchValue.includes("@")) {
               this.readFromDb({ email: { $regex : new RegExp(searchValue, "i") } }, function (valueE: any) {
                    if (valueE == null) {
                         callback(UserLogic.responseMsgBuilder(ResponseEnum.Error, "false"))
                    } else {
                         UserLogic.verfiyPw(valueE["password"], pw, function (value2E: any) {
                              if(value2E){
                                   callback(UserLogic.responseMsgBuilder(ResponseEnum.Success, valueE))
                              }else{
                                   callback(UserLogic.responseMsgBuilder(ResponseEnum.Error, "false"))
                              }
                         });
                    }
               });
          } else {
               this.readFromDb({ userName: { $regex : new RegExp(searchValue, "i") } }, function (valueU: any) {
                    if (valueU == null) {
                         console.log(1);
                         callback(UserLogic.responseMsgBuilder(ResponseEnum.Error, "false"))
                    } else {
                         UserLogic.verfiyPw(valueU["password"], pw, function (value2U: any) {
                              if(value2U){
                                   callback(UserLogic.responseMsgBuilder(ResponseEnum.Success, valueU))
                              }else{
                                   callback(UserLogic.responseMsgBuilder(ResponseEnum.Error, "false"))
                              }
                         });
                    }
               });
          }
     }
     static validateUsername(username: string) {
          if (username.length < 5)
               return this.responseMsgBuilder(ResponseEnum.Error, ShortUsername)
          if (username.match(usernameRegex))
               return this.responseMsgBuilder(ResponseEnum.Error, InvalidUsername)
          return true;
     }
     static validateEmail(email: string) {
          if (!EmailValidator.validate(email))
               return this.responseMsgBuilder(ResponseEnum.Error, InvalidMail);
          return true;
     }
     async writeUserToDb(user: User, callback: any) {
          DatabseLogic.writeToDB(user, function () {
               callback();
          })
     }
     async readFromDb(param: Object, callback: any) {
          DatabseLogic.readFromDB(param, function (value: any) {
               callback(value);
          })
     }
     static responseMsgBuilder(type: ResponseEnum, message: string) {
          return new ResponseObj(type, message);
     }
     static verfiyPw(hash: string, pw: string, callback: any) {
          pwd.verify(Buffer.from(pw), Buffer.from(hash), function (err, result) {
               if (err) throw err
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