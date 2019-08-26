"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var EmailValidator = __importStar(require("email-validator"));
var DatabaseLogic_1 = require("./DatabaseLogic");
var UserLogic = /** @class */ (function () {
    function UserLogic() {
    }
    UserLogic.createUser = function (user) {
    };
    ;
    UserLogic.isUserNotNull = function (user) {
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
    };
    UserLogic.validateUser = function (user) {
        if (!EmailValidator.validate(user.email))
            return this.responseMsgBuilder(ResponseEnum.Error, InvalidMail);
        if (user.userName.length < 5)
            return this.responseMsgBuilder(ResponseEnum.Error, ShortUsername);
        if (user.userName.match(usernameRegex))
            return this.responseMsgBuilder(ResponseEnum.Error, InvalidUsername);
        if (user.password != undefined && user.password.match(passwordRegex))
            return this.responseMsgBuilder(ResponseEnum.Error, InvalidPassword);
        return true;
    };
    ;
    UserLogic.writeUserToDb = function () {
        var getCollection = function () {
            return DatabaseLogic_1.MongoHelper.client.db('Tweety').collection('Users');
        };
    };
    UserLogic.responseMsgBuilder = function (type, message) {
        return new ResponseObj(type, message);
    };
    return UserLogic;
}());
exports.UserLogic = UserLogic;
