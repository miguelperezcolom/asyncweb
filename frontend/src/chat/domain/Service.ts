import {chatApiClient} from "./apiClients/chatApiClient";
import {Message} from "./model/Message";

export class Service {

    send(msg: Message) {
        chatApiClient.send(msg)
    }

}

export const service = new Service()