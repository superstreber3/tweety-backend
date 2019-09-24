var validator: any = require("validator");
export class Tweet implements ITweetInterface {
    creator: string;
    timeStamp: Date;
    content: string;
    topic: string;
 constructor (creator: string, timeStamp: Date, content: string, topic: string) {
  this.creator = validator.escape(creator);
  this.timeStamp = validator;
  this.content = validator.escape(content);
  this.topic = validator.escape(topic);
 }
}
