import { Logic } from "./Logic";

export class TopicLogic {
    async getTopic(callback: Function): Promise<any> {
        const l: Logic = new Logic;
        var activeTopic: string;
        var topicName: string;
        l.readFromDb({ _id: "active" }, "Topics", function (value: any): any {
            activeTopic = value.topic_id;
            l.readFromDb({ _id: activeTopic }, "Topics", function (value: any): any {
                topicName = value.topic;
                callback(topicName);
            });
        });
    }

    async setTopic(topic: string, id: string, callback: Function): Promise<any> {
        const l: Logic = new Logic;
        var isAdmin: boolean;
        var topicName: string;
        l.readFromDb({ _id: id }, "Users", function (value: any): any {
            isAdmin = value.topic_id;
            if (isAdmin) {
              //  l.readFromDb({ _id: activeTopic }, "Topics", function (value: any): any {
              //      topicName = value.topic;
              //      callback(topicName);
              //  });
            }
        });
    }
}