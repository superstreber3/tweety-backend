import * as EmailValidator from 'email-validator';
import { MongoHelper } from './DatabaseLogic';

export class UserLogic {
     static createUser(user: User) {

     };
     static isUserNotNull(user: User) {
          if (user.email != undefined)
               return this.responseMsgBuilder(ResponseEnum.Error, NoMail);
          if (user.firstName != undefined)
               return this.responseMsgBuilder(ResponseEnum.Error, NoFirstname);
          if (user.lastName != undefined)
               return this.responseMsgBuilder(ResponseEnum.Error, NoLastname);
          if (user.userName != undefined)
               return this.responseMsgBuilder(ResponseEnum.Error, NoUsername);
          if (user.password != undefined)
               return this.responseMsgBuilder(ResponseEnum.Error, NoPassword);
          return true;
     }
     static validateUser(user: User) {
          if (!EmailValidator.validate(user.email))
               return this.responseMsgBuilder(ResponseEnum.Error, InvalidMail);
          if (user.userName.length < 5)
               return this.responseMsgBuilder(ResponseEnum.Error, ShortUsername)
          if (user.userName.match(usernameRegex))
               return this.responseMsgBuilder(ResponseEnum.Error, InvalidUsername)
          if (user.password != undefined && user.password.match(passwordRegex))
               return this.responseMsgBuilder(ResponseEnum.Error, InvalidPassword)
          return true;
     };

      static writeUserToDb() {
               console.log(MongoHelper.client.db('Tweety').collection('Users'));
           
     }
     static responseMsgBuilder(type: ResponseEnum, message: string) {
          return new ResponseObj(type, message);
     }
}