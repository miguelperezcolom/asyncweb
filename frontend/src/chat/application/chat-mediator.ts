import { html, css, LitElement } from 'lit'
import {customElement, property, state} from 'lit/decorators.js'
import './chat-all'
import {State} from "../domain/centralState";
import {upstream} from "../domain/upstream";
import {service} from "../domain/Service";
import {chatApiClient} from "../domain/apiClients/chatApiClient";
import {AtmosphereChatApiClient} from "../infra/atmosphereChatApiClient";
import {msgStream} from "../domain/streams";
import {Message} from "../domain/model/Message";

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


  connectedCallback() {
    super.connectedCallback();

    chatApiClient.impl = new AtmosphereChatApiClient()

    upstream.subscribe((state) => {
      this.state = state
    })

    msgStream.subscribe((msg: Message) => {
      const state = {...this.state}
      state.messages = [...state.messages, msg]
      upstream.next(state)
    })

  }

  send(event: CustomEvent) {
    service.send(event.detail)
  }

  render() {
    return html`
      <chat-all .state="${this.state}" @send="${this.send}"></chat-all>
    `
  }

}

declare global {
  interface HTMLElementTagNameMap {
    'chat-mediator': ChatMediator
  }
}
