import {Message} from "../model/Message";

export interface ChatApiClient {

    send(msg: Message): void

}

export class ChatApiClientProxy implements ChatApiClient {

    impl: ChatApiClient

    send(msg:Message) {
        this.impl.send(msg)
    }

}

export var chatApiClient = new ChatApiClientProxy()