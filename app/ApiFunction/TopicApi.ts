import app from "../app";
import { TopicLogic } from "../Logic/TopicLogic";
import { Logic } from "../Logic/Logic";
import { ResponseEnum } from "../Enum/ResponseEnum";
import { NoTopic, TopicChangeSuccess, InvalidTopicId } from "../Messages/TopicMessages";
import { InvalidPermissions } from "../Messages/Messages";

app.get("/getActiveTopic", function (req: any, res: any): any {
    var tl: TopicLogic = new TopicLogic;
    tl.getActiveTopic(function (value: string): any {
        res.status(200).send(value);
        return;
    });
    res.status(400);
    return;
});

console.log(" ↳'/getActiveTopic' started");

app.get("/getTopics", function (req: any, res: any): any {
    var tl: TopicLogic = new TopicLogic;
    tl.getTopics(function (value: string): any {
        res.status(200).send(value);
        return;
    });
    res.status(400);
    return;
});

console.log(" ↳'/getTopics' started");

app.post("/setTopic", function (req: any, res: any): any {
    var topic: string = req.body.topic;
    if (topic === undefined) {
        res.status(400).send(Logic.responseMsgBuilder(ResponseEnum.Error, NoTopic));
        return;
    }
    var tl: TopicLogic = new TopicLogic;
    var l: Logic = new Logic;
    if (l.isAdmin(req.session.user)) {
        tl.setTopic(topic, req.session.user, function (value: boolean): any {
            if (value) {
                res.status(200).send(Logic.responseMsgBuilder(ResponseEnum.Success, TopicChangeSuccess));
                return;
            } else {
                res.status(400).send(Logic.responseMsgBuilder(ResponseEnum.Error, InvalidTopicId));
            }
        });
    } else {
        res.status(400).send(Logic.responseMsgBuilder(ResponseEnum.Error, InvalidPermissions));
    }
});

console.log(" ↳'/setTopic' started");

console.log(" ✅");
