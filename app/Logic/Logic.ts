import {
    ResponseObj
} from '../Object/ResponseObj'
import {
    ResponseEnum
} from '../Enum/ResponseEnum';

export class Logic {
    static responseMsgBuilder(type: ResponseEnum, message: string) {
        return new ResponseObj(type, message);
    }

}