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
var UserLogic = /** @class */ (function () {
    function UserLogic() {
    }
    UserLogic.createUser = function (user) {
    };
    ;
    UserLogic.validateUser = function (user) {
        if (!EmailValidator.validate(user.email))
            return this.responseMsgBuilder(ResponseEnum.Error, "This E-mail is invalid");
        if (user.userName.length < 5)
            return this.responseMsgBuilder(ResponseEnum.Error, "The Username needs to contain at least 5 Characters");
        if (user.userName.match(usernameRegex))
            return this.responseMsgBuilder(ResponseEnum.Error, "The Username is only allowed to have alphanumeric charakters(a-z and 0-9)");
        if (user.password != undefined && user.password.match(passwordRegex))
            return this.responseMsgBuilder(ResponseEnum.Error, "The Password must be at least 8 characters long, containing a lowercase, uppercase, number and a special character");
    };
    ;
    UserLogic.responseMsgBuilder = function (type, message) {
        return new ResponseObj(type, message);
    };
    return UserLogic;
}());
exports.UserLogic = UserLogic;
