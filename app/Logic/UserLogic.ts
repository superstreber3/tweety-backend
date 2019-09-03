import * as EmailValidator from 'email-validator';
import { DatabseLogic } from './DatabaseLogic';
import { ResponseEnum } from '../Enum/ResponseEnum';
import { User } from '../Object/UserObj';
import { ResponseObj } from '../Object/ResponseObj'
import { InvalidMail, ShortUsername, InvalidUsername, InvalidPassword } from '../Messages/UserLogicMessages'
import { usernameRegex, passwordRegex } from './Regex';

export class UserLogic {
     static validateUser(user: User) {
          var validatemail = this.validateMail(user.email);
          var validateUsername = this.validateUsername(user.userName);
          var validateEmail = this.validateEmail(user.email);
          if (validateEmail != true)
               return validateEmail;
          if (validateUsername  != true)
               return validateUsername;
          if (validatemail  != true)
               return validatemail;
          return true;

     };
     static validateMail(email: string) {
          if (!email.match(passwordRegex))
               return this.responseMsgBuilder(ResponseEnum.Error, InvalidPassword)
          return true;
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
}