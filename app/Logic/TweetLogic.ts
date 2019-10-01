import { Logic } from "./Logic";
import { ObjectId } from "bson";
import { Tweet } from "../Object/TweetObj";
var moment: any = require("moment");
export class TweetLogic {
    static checkCreator(id: string, callack: Function): any {
        const l: Logic = new Logic;
        l.readFromDb({ _id: new ObjectId(id) }, "Users", function (value: any): any {
            if (value !== null) {
                callack(true);
                return;
            }
            callack(false);
        });
    }
    static contentCheck(content: string): boolean {
        if (content.length >= 5 && content.length <= 255) { return true; }
        return false;
    }
    writeTweetToDb(tweet: Tweet, callback: Function): any {
        const l: Logic = new Logic;
        l.writeUserToDb(tweet, "Tweets", function (): any {
            callback();
        });
    }
    ReadAllofTodayFromDb(active: any, callback: Function): any {
        const l: Logic = new Logic;
        l.readMultiFromDb({topic: active}, "Tweets", function (value: any): any {
            callback(value);
        });
    }
}