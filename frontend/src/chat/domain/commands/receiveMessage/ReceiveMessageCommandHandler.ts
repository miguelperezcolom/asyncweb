import {ReceiveMessageCommand} from "./ReceiveMessageCommand";
import {upstream} from "../../upstream";
import {centralState} from "../../model/centralState";

export class ReceiveMessageCommandHandler {

    handle(command: ReceiveMessageCommand): void {
        centralState.messages = [...centralState.messages,command.message]
        upstream.next({...centralState})
    }

}

export const receiveMessageCommandHandler = new ReceiveMessageCommandHandler()