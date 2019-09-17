import app from '../app';
import {
    Logic
} from '../Logic/Logic';
import {
    ResponseEnum
} from '../Enum/ResponseEnum';
import {
    NoCreaor,
    NoTimeStamp,
    NoContent,
    NoTopic
} from '../Messages/TweetMessages';
app.post('/post', function (req: any, res) {
    var creator = req.body.creator;
    var timeStamp = req.body.timeStamp;
    var content = req.body.content;
    var topic = req.body.topic;
    if (creator != undefined) {
        res.send(Logic.responseMsgBuilder(ResponseEnum.Error, NoCreaor));
        return
    }
    if (timeStamp != undefined) {
        res.send(Logic.responseMsgBuilder(ResponseEnum.Error, NoTimeStamp));
        return
    }
    if (content != undefined) {
        res.send(Logic.responseMsgBuilder(ResponseEnum.Error, NoContent));
        return
    }
    if (topic != undefined) {
        res.send(Logic.responseMsgBuilder(ResponseEnum.Error, NoTopic));
        return
    }

});

console.log(" ↳'/post' started");

console.log("Done");