export class Tweet implements TweetInterface {
    creator: string;
    timeStamp: Date;
    content: string;
    topic: string;
 constructor (creator: string, timeStamp: Date, content: string, topic: string) {
  this.creator = creator;
  this.timeStamp = timeStamp;
  this.content = content;
  this.topic = topic;
 }
}
