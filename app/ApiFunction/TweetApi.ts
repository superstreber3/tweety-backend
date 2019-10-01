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
import { TopicLogic } from "../Logic/TopicLogic";


app.post("/post", function (req: any, res: any): any {
    if (req.body === undefined) {
        res.status(400).send(Logic.responseMsgBuilder(ResponseEnum.Error, UnexpectedError));
        return;
    }
    var content: string = req.body.content;
    if (content === undefined) {
        res.status(400).send(Logic.responseMsgBuilder(ResponseEnum.Error, NoContent));
        return;
    }
    var today: Date = new Date();
    var ddString: string;
    var mmString: string;
    var dd: number = today.getDate();
    var mm: number = today.getMonth() + 1; // january is 0!
    var yyyy: number = today.getFullYear();
    if (dd < 10) {
        ddString = "0" + dd;
    }
    ddString = dd.toString();
    if (mm < 10) {
        mmString = "0" + mm;
    }
    mmString = mm.toString();
    var todayString: string = ddString + "/" + mmString + "/" + yyyy.toString();
    var topicL: TopicLogic = new TopicLogic;
    topicL.getActiveTopic(function (value: any): any {
        if (req.session.user !== undefined) {
            var tweet: ITweetInterface = new Tweet(
                req.session.user.toString(),
                todayString,
                content,
                value.topic
            );
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
            res.status(401);
        }
    });
});

console.log(" ↳'/post' started");

app.get("/getPost", function (req: any, res: any): any {
});

console.log(" ↳'/getPost' started");

console.log(" ✅");