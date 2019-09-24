import {
    ResponseObj
} from "../Object/ResponseObj";
import {
    ResponseEnum
} from "../Enum/ResponseEnum";
import { DatabseLogic } from "./DatabaseLogic";

export class Logic {
    static responseMsgBuilder(type: ResponseEnum, message: string): ResponseObj {
        return new ResponseObj(type, message);
    }
    async writeUserToDb(value: any, collection: string, callback: any): Promise<any> {
        DatabseLogic.writeToDB(value, collection, function () {
             callback();
        });
   }
   async readFromDb(param: Object, collection: string, callback: any): Promise<any> {
        DatabseLogic.readFromDB(param, collection, function (value: any): any {
             callback(value);
        });
   }
}