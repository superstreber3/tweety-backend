import * as EmailValidator from 'email-validator';


export class UserLogic {
     static createUser(user:User) {
         
     };
     static isUserNotNull(user:User){
          if(user.email != undefined)
          return this.responseMsgBuilder(ResponseEnum.Error, );
     }
     static validateUser(user:User){
     if(!EmailValidator.validate(user.email))
          return this.responseMsgBuilder(ResponseEnum.Error, InvalidMail);
     if(user.userName.length < 5)
          return this.responseMsgBuilder(ResponseEnum.Error, ShortUsername)
     if(user.userName.match(usernameRegex))
          return this.responseMsgBuilder(ResponseEnum.Error, InvalidUsername)
     if(user.password != undefined && user.password.match(passwordRegex))
          return this.responseMsgBuilder(ResponseEnum.Error, InvalidPassword)
     };
     static responseMsgBuilder(type:ResponseEnum, message:string){
          return new ResponseObj(type, message); 
          }
     }