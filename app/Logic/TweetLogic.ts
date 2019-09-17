import { Logic } from "./Logic";

export class TweetLogic {
    static createtime(time: any): any {
        time = new Date(time);
        if (time !== "Invalid Date") {
            return time;
        } else {
            return false;
        }
    }
    static checkCreator(id: any): any {
        const l: Logic = new Logic;
    }
}