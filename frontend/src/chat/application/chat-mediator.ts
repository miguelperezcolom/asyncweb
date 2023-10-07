import {css, html, LitElement} from 'lit'
import {customElement, state} from 'lit/decorators.js'
import './components/chat-implementation-selector'
import './components/chat-received'
import './components/chat-form'
import {State} from "../domain/model/centralState";
import {upstream} from "../domain/upstream";
import {service} from "../domain/Service";
import {msgStream} from "../domain/streams/domainStreams";
import {Message} from "../domain/model/Message";
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

  @state()
  state: State = new State()

  connectedCallback() {
    super.connectedCallback();


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



  render() {
    return html`
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
