import app from "../app";
import {
    Logic
} from "../Logic/Logic";
import {
    ResponseEnum
} from "../Enum/ResponseEnum";
import {
    NoCreaor,
    NoTimeStamp,
    NoContent,
    NoTopic,
    invalidTimeSpamp
} from "../Messages/TweetMessages";
import { Tweet } from "../Object/TweetObj";
import { TweetLogic } from "../Logic/TweetLogic";
app.post("/post", function (req: any, res) {
    var creator: string = req.body.creator;
    var timeStamp: string = req.body.timestamp;
    var content: string = req.body.content;
    var topic: string = req.body.topic;
    if (creator !== undefined) {
        res.send(Logic.responseMsgBuilder(ResponseEnum.Error, NoCreaor));
        return;
    }
    if (timeStamp !== undefined) {
        res.send(Logic.responseMsgBuilder(ResponseEnum.Error, NoTimeStamp));
        return;
    }
    if (content !== undefined) {
        res.send(Logic.responseMsgBuilder(ResponseEnum.Error, NoContent));
        return;
    }
    if (topic !== undefined) {
        res.send(Logic.responseMsgBuilder(ResponseEnum.Error, NoTopic));
        return;
    }
    var time:any = TweetLogic.createtime(timeStamp);
    if(time === false) {
        res.send(Logic.responseMsgBuilder(ResponseEnum.Error, invalidTimeSpamp));
        return;
    }
    var tweet: TweetInterface = new Tweet(
        creator,
        time,
        content,
        topic
      );

});

console.log(" ↳'/post' started");

console.log(" ✅");