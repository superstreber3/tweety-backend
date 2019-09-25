import app from "../app";
import { TopicLogic } from "../Logic/TopicLogic";
import { Logic } from "../Logic/Logic";
import { ResponseEnum } from "../Enum/ResponseEnum";
import { NoTopic, TopicChangeSuccess, InvalidTopicId } from "../Messages/TopicMessages";
import { InvalidPermissions } from "../Messages/Messages";

app.get("/getTopic", function (req: any, res: any): any {
    var tl: TopicLogic = new TopicLogic;
    tl.getTopic(function (value: string): any {
        res.send(value);
        return;
    });
    // enter error Status Code
    return;
});

console.log(" ↳'/getTopic' started");

app.post("/setTopic", function (req: any, res: any): any {
    var topic: string = req.body.topic;
    if (topic === undefined) {
        res.send(Logic.responseMsgBuilder(ResponseEnum.Error, NoTopic));
        return;
    }
    var tl: TopicLogic = new TopicLogic;
    var l: Logic = new Logic;
    if (l.isAdmin(req.session.user)) {
        tl.setTopic(topic, req.session.user, function (value: boolean): any {
            if (value) {
                res.send(Logic.responseMsgBuilder(ResponseEnum.Success, TopicChangeSuccess));
                return;
            } else {
                res.send(Logic.responseMsgBuilder(ResponseEnum.Error, InvalidTopicId));
            }
        });
    } else {
        res.send(Logic.responseMsgBuilder(ResponseEnum.Error, InvalidPermissions));
    }
});

console.log(" ↳'/setTopic' started");

console.log(" ✅");
