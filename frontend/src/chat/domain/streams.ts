import {Subject} from "rxjs";
import {Message} from "./model/Message";

export const msgStream: Subject<Message> = new Subject()
export const connectedStream: Subject<any> = new Subject()
export const errorStream: Subject<any> = new Subject()