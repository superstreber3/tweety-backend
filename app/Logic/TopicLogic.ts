import { Logic } from "./Logic";
import { ObjectId } from "bson";

export class TopicLogic {
    async getActiveTopic(callback: Function): Promise<any> {
        const l: Logic = new Logic;
        var activeTopic: string;
        var topicName: string;
        l.readFromDb({ _id: "active" }, "Topics", function (value: any): any {
            activeTopic = value.topic_id;
            l.readFromDb({ _id: activeTopic }, "Topics", function (value: any): any {
                callback(value);
            });
        });
    }

    async getTopics(callback: Function): Promise<any> {
        const l: Logic = new Logic;
        l.readAllFromDb("Topics", function (value: any): any {
            callback(value);
        });
    }

    async setTopic(topicId: string, id: string, callback: Function): Promise<any> {
        const l: Logic = new Logic;
        l.readFromDb({ _id: new ObjectId(topicId) }, "Topics", function (value: any): any {
            if (value !== null) {
                l.UpdateToDb({ _id: "active" }, { $set: { topic_id: new ObjectId(topicId) } }, "Topics", function (): any {
                    callback(true);
                });
            } else {
                callback(false);
            }
        });
    }
}