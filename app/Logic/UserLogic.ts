import * as EmailValidator from 'email-validator';
import { DatabseLogic } from './DatabaseLogic';
import { ResponseEnum } from '../Enum/ResponseEnum';
import { User } from '../Object/UserObj';
import { ResponseObj } from '../Object/ResponseObj'
import { InvalidMail, ShortUsername, InvalidUsername, InvalidPassword } from '../Messages/UserLogicMessages'
import { usernameRegex, passwordRegex } from './Regex';

export class UserLogic {
     static validateUser(user: User) {
          if (!EmailValidator.validate(user.email))
               return this.responseMsgBuilder(ResponseEnum.Error, InvalidMail);
          if (user.userName.length < 5)
               return this.responseMsgBuilder(ResponseEnum.Error, ShortUsername)
          if (user.userName.match(usernameRegex))
               return this.responseMsgBuilder(ResponseEnum.Error, InvalidUsername)
          if (!user.password.match(passwordRegex))
               return this.responseMsgBuilder(ResponseEnum.Error, InvalidPassword)
          return true;
     };

     async writeUserToDb(user: User, callback: any) {
          DatabseLogic.writeToDB(user, function() {
            callback();   
          })
     }
     static responseMsgBuilder(type: ResponseEnum, message: string) {
          return new ResponseObj(type, message);
     }
}