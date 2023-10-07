import {Message} from "../model/Message";

export interface ChatApiClient {

    send(msg: Message): void

    unbind(): void

}

export class ChatApiClientProxy implements ChatApiClient {

    impl: ChatApiClient | undefined

    send(msg:Message) {
        this.impl?.send(msg)
    }

    unbind(): void {
        this.impl?.unbind()
    }

}

export var chatApiClient = new ChatApiClientProxy()