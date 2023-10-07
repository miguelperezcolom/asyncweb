import {Message} from "./model/Message";

export class State {
    messages: Message[] = [];
    errors: string = '';
}
export const centralState = new State();