import {customElement, state} from 'lit/decorators.js'
import './chat-mediator'
import {ChatMediator} from "./chat-mediator";
import {html, LitElement} from "lit";
import {chatApiClient} from "../domain/apiClients/chatApiClient";
import {AtmosphereChatApiClient} from "../infra/atmosphereChatApiClient";
import {PropertyValues} from "lit/development";
import {SocketIOChatApiClient} from "../infra/socketioChatApiClient";
import {CustomChatApiClient} from "../infra/customChatApiClient";
/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('chat-app')
export class ChatApp extends LitElement {

  @state()
  implementation: string = 'atmosphere'

  changeImplementation(event: CustomEvent) {
    this.updateImplementation(event.detail)
  }

  connectedCallback() {
    super.connectedCallback();
    chatApiClient.impl = new AtmosphereChatApiClient()

  }

  protected updated(_changedProperties: PropertyValues) {
    super.updated(_changedProperties);
    if (_changedProperties.has('implementation') && _changedProperties.get('implementation')) {
      this.updateImplementation(this.implementation)
    }
  }

  private updateImplementation(implementation: string) {
    console.log('setting implementation to', implementation)
    chatApiClient.impl?.unbind()
    if ('atmosphere' == implementation) {
      chatApiClient.impl = new AtmosphereChatApiClient()
    } else if ('socketio' == implementation) {
      chatApiClient.impl = new SocketIOChatApiClient()
    } else if ('custom' == implementation) {
      chatApiClient.impl = new CustomChatApiClient()
    } else {
      console.error('unknown implementation ', implementation)
      console.log('valid implementations are atmosphere, socketio or custom')
    }
  }

  protected render(): unknown {
    return html`
      <chat-implementation-selector @change-implementation="${this.changeImplementation}"></chat-implementation-selector>
      <chat-mediator></chat-mediator>
    `;
  }


}

declare global {
  interface HTMLElementTagNameMap {
    'chat-app': ChatMediator
  }
}
