import {Message} from "../model/Message";

export interface ChatApiClient {

    send(msg: Message): void

    subscribe(): void

}