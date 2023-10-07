import {ChatApiClient} from "../domain/apiClients/chatApiClient";
import {Message} from "../domain/model/Message";

export class AtmosphereChatApiClient implements ChatApiClient {
    send(msg: Message): void {
        console.log('would be sending', msg)
    }

    subscribe(): void {
    }

}