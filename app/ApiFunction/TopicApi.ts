import app from "../app";
import { TopicLogic } from "../Logic/TopicLogic";

app.get("/getTopic", function (req: any, res: any): any {
    var tl: TopicLogic = new TopicLogic;
    tl.getTopic(function (value: string): any {
        res.send(value);
        return;
    });
});

console.log(" ↳'/getTopic' started");

app.post("/setTopic", function (req: any, res: any): any {
    var topic: string = req.body.topic;
    var tl: TopicLogic = new TopicLogic;
    tl.setTopic(topic, req.session.user, function (value: string): any {
        res.send(value);
        return;
    });
});

console.log(" ↳'/setTopic' started");

console.log(" ✅");
