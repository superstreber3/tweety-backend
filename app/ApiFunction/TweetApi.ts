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
    invalidTimeSpamp,
    invalidCreator,
    invalidTopic,
    invalidContent,
    insertedTweet
} from "../Messages/TweetMessages";
import { Tweet } from "../Object/TweetObj";
import { TweetLogic } from "../Logic/TweetLogic";
import { UnexpectedError } from "../Messages/Messages";


app.post("/post", function (req: any, res: any): any {
    if (req.body === undefined) {
        res.status(400).send(Logic.responseMsgBuilder(ResponseEnum.Error, UnexpectedError));
        return;
    }
    var creator: string = req.body.creator;
    var timeStamp: string = req.body.timestamp;
    var content: string = req.body.content;
    var topic: string = req.body.topic;
    if (creator === undefined) {
        res.status(400).send(Logic.responseMsgBuilder(ResponseEnum.Error, NoCreaor));
        return;
    }
    if (timeStamp === undefined) {
        res.status(400).send(Logic.responseMsgBuilder(ResponseEnum.Error, NoTimeStamp));
        return;
    }
    if (content === undefined) {
        res.status(400).send(Logic.responseMsgBuilder(ResponseEnum.Error, NoContent));
        return;
    }
    if (topic === undefined) {
        res.status(400).send(Logic.responseMsgBuilder(ResponseEnum.Error, NoTopic));
        return;
    }
    var time: any = TweetLogic.createtime(timeStamp);
    if (time === false) {
        res.status(400).send(Logic.responseMsgBuilder(ResponseEnum.Error, invalidTimeSpamp));
        return;
    }
    var tweet: ITweetInterface = new Tweet(
        creator,
        time,
        content,
        topic
    );
    TweetLogic.checkCreator(tweet.creator, function (value: any): any {
        if (value) {
            TweetLogic.isTopicActive(tweet.topic, function (value: any): any {
                if (value) {
                    if (TweetLogic.contentCheck(tweet.content)) {
                        var tl: TweetLogic = new TweetLogic;
                        tl.writeTweetToDb(tweet, function (): any {
                            res.status(200).send(Logic.responseMsgBuilder(ResponseEnum.Success, insertedTweet));
                        });
                    } else {
                        res.status(400).send(Logic.responseMsgBuilder(ResponseEnum.Error, invalidContent));
                        return;
                    }
                } else {
                    res.status(400).send(Logic.responseMsgBuilder(ResponseEnum.Error, invalidTopic));
                    return;
                }
            });
        } else {
            res.status(400).send(Logic.responseMsgBuilder(ResponseEnum.Error, invalidCreator));
            return;
        }
    });
});

console.log(" ↳'/post' started");

app.get("/getPost", function (req: any, res: any): any {
});

console.log(" ↳'/getPost' started");

console.log(" ✅");