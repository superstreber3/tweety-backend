import * as MongoClient from "mongodb";
import * as assert from "assert";
const url: string = "mongodb://localhost:27017/Tweety";
export class DatabseLogic {
  static writeToDB(value: any,  collectionString: string, callback: any): any {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err: any, client: any): any {
      assert.equal(null, err);
      const collection: any = client.db().collection(collectionString);
      collection.insertOne(value, function (err: any, res: any): any {
        if (err) { throw err; }
        client.close();
      });

    });
    callback();
  }
  static readFromDB(search: Object, collectionString: string, callback: any): any {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err: any, client: any): any {
      assert.equal(null, err);
      const collection: any = client.db().collection(collectionString);
      collection.findOne(search, function (err: any, res: any): any {
        if (err) { throw err; }
        client.close();
        callback(res);
      });

    });
  }
}


