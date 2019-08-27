"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongo = __importStar(require("mongodb"));
var MongoHelper = /** @class */ (function () {
    function MongoHelper() {
    }
    MongoHelper.connect = function () {
        return new Promise(function (resolve, reject) {
            mongo.MongoClient.connect("localhost:27017/Tweety", { useNewUrlParser: true }, function (err, client) {
                if (err) {
                    reject(err);
                }
                else {
                    MongoHelper.client = client;
                    resolve(client);
                }
            });
        });
    };
    MongoHelper.prototype.disconnect = function () {
        MongoHelper.client.close();
    };
    return MongoHelper;
}());
exports.MongoHelper = MongoHelper;
