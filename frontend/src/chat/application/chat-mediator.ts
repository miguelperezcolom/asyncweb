import {html, css, LitElement, PropertyValues} from 'lit'
import {customElement, property, state} from 'lit/decorators.js'
import './components/chat-implementation-selector'
import './components/chat-received'
import './components/chat-form'
import {State} from "../domain/model/centralState";
import {upstream} from "../domain/upstream";
import {service} from "../domain/Service";
import {chatApiClient} from "../domain/apiClients/chatApiClient";
import {AtmosphereChatApiClient} from "../infra/atmosphereChatApiClient";
import {msgStream} from "../domain/streams/domainStreams";
import {Message} from "../domain/model/Message";
import {SocketIOChatApiClient} from "../infra/socketioChatApiClient";
import {CustomChatApiClient} from "../infra/customChatApiClient";
import {receiveMessageCommandHandler} from "../domain/commands/receiveMessage/ReceiveMessageCommandHandler";

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('chat-mediator')
export class ChatMediator extends LitElement {
  static styles = css`
  `

  @property()
  implementation: string = 'atmosphere'

  @state()
  state: State = new State()

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


  connectedCallback() {
    super.connectedCallback();

    chatApiClient.impl = new AtmosphereChatApiClient()

    upstream.subscribe((state) => {
      this.state = state
    })

    msgStream.subscribe((msg: Message) => {
      receiveMessageCommandHandler.handle({
        message: msg
      })
    })

  }

  disconnectedCallback() {
    super.disconnectedCallback();
    upstream.unsubscribe()
    msgStream.unsubscribe()
  }

  send(event: CustomEvent) {
    service.send(event.detail)
  }

  changeImplementation(event: CustomEvent) {
    this.updateImplementation(event.detail)
  }

  render() {
    return html`
      <chat-implementation-selector @change-implementation="${this.changeImplementation}"></chat-implementation-selector>
      <chat-received .state="${this.state}"></chat-received>
      <chat-form @send="${this.send}"></chat-form>
    `
  }

}

declare global {
  interface HTMLElementTagNameMap {
    'chat-mediator': ChatMediator
  }
}
