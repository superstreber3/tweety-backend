
import {ResponseEnum} from '../Enum/ResponseEnum'
export class ResponseObj{
    type: ResponseEnum;
    message: string;
 constructor (type: ResponseEnum, message: string) {
  this.type = type;
  this.message = message;
 }
}
