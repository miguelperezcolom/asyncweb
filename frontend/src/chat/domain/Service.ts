import {Message} from "./model/Message";
import {sendMessageCommandHandler} from "./commands/SendMessageCommandHandler";

export class Service {

    send(msg: Message) {
        sendMessageCommandHandler.handle({
            message: msg
        })
    }

}

export const service = new Service()