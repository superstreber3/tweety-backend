import app from "../app";
import { TopicLogic } from "../Logic/TopicLogic";
import { Logic } from "../Logic/Logic";
import { ResponseEnum } from "../Enum/ResponseEnum";
import { NoTopic, TopicChangeSuccess, InvalidTopicId, NoName } from "../Messages/TopicMessages";
import { InvalidPermissions } from "../Messages/Messages";

app.get("/getActiveTopic", function (req: any, res: any): any {
    var tl: TopicLogic = new TopicLogic;
    tl.getActiveTopic(function (value: string): any {
        res.status(200).send(value);
        return;
    });
    res.status(200);
    return;
});

console.log(" ↳'/getActiveTopic' started");

app.get("/getTopics", function (req: any, res: any): any {
    var tl: TopicLogic = new TopicLogic;
    tl.getTopics(function (value: string): any {
        res.status(200).send(value);
        return;
    });
    res.status(200);
    return;
});

console.log(" ↳'/getTopics' started");

app.post("/setTopic", function (req: any, res: any): any {
    var topic: string = req.body.topic;
    if (topic === undefined) {
        res.status(200).send(Logic.responseMsgBuilder(ResponseEnum.Error, NoTopic));
        return;
    }
    var tl: TopicLogic = new TopicLogic;
    var l: Logic = new Logic;
    l.isAdmin(req.session.user, function (value: any): any {
        if (value) {
            tl.setTopic(topic, req.session.user, function (value: boolean): any {
                if (value) {
                    res.status(200).send(Logic.responseMsgBuilder(ResponseEnum.Success, TopicChangeSuccess));
                    return;
                } else {
                    res.status(200).send(Logic.responseMsgBuilder(ResponseEnum.Error, InvalidTopicId));
                }
            });
        } else {
            res.status(401).send(Logic.responseMsgBuilder(ResponseEnum.Error, InvalidPermissions));
        }
    });
});

console.log(" ↳'/setTopic' started");

app.post("/addTopic", function (req: any, res: any): any {
    var name: any = req.body.name;
    if (name === undefined) {
        res.status(200).send(Logic.responseMsgBuilder(ResponseEnum.Error, NoName));
        return;
    }
    var tl: TopicLogic = new TopicLogic;
    tl.addTopic(name, function (value: any): any {
        if (value === null) {
            tl.getTopic(name, function (value: any): any {
                res.status(200).send(value);
            });
            return;
        } else {
            res.status(200).send(value);
            return;
        }
    });
});

console.log(" ↳'/addTopic' started");

console.log(" ✅");
