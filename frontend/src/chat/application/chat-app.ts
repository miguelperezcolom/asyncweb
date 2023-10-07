import { customElement} from 'lit/decorators.js'
import './chat-mediator'
import {ChatMediator} from "./chat-mediator";
/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('chat-app')
export class ChatApp extends ChatMediator {

}

declare global {
  interface HTMLElementTagNameMap {
    'chat-app': ChatMediator
  }
}
