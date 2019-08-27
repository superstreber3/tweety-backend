import * as MongoClient from 'mongodb';
import * as assert from 'assert';
const url = "mongodb://localhost:27017/Tweety";
export class DatabseLogic {
  static writeToDB(user: any, callback: any) {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
      assert.equal(null, err);
      const collection = client.db().collection('Users');
      collection.insertOne(user, function (err, res) {
        if (err) throw err;
        client.close();
      })

    });
    callback();
  }
}


