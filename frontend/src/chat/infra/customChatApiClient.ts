import {ChatApiClient} from "../domain/apiClients/chatApiClient";
import {Message} from "../domain/model/Message";
import {receiveMessageCommandHandler} from "../domain/commands/receiveMessage/ReceiveMessageCommandHandler";

export class CustomChatApiClient implements ChatApiClient {
    private evtSource: EventSource | undefined;
    send(msg: Message): void {
        console.log('would be sending', msg)

        if (this.evtSource) {
            this.evtSource.close()
        }

        this.evtSource = new EventSource("https://sse.mateu.io/stream-flux?msg=" + btoa(JSON.stringify(msg)));

        this.evtSource.onmessage = (event) => {
            console.log('received', event)
            receiveMessageCommandHandler.handle({
                message: JSON.parse(event.data)
            })
        };

        this.evtSource.onerror = () => {
            this.evtSource?.close()
        }

    }

    unbind(): void {
    }

}