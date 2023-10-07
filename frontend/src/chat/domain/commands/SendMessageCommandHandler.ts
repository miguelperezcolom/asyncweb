import {SendMessageCommand} from "./SendMessageCommand";
import {chatApiClient} from "../apiClients/chatApiClient";

export class SendMessageCommandHandler {

    handle(command: SendMessageCommand): void {
        chatApiClient.send(command.message)
    }

}

export const sendMessageCommandHandler = new SendMessageCommandHandler()