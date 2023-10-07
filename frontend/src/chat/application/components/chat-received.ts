import {html, LitElement} from 'lit'
import {customElement, property} from 'lit/decorators.js'
import {State} from "../../domain/centralState";

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('chat-received')
export class ChatReceived extends LitElement {

  /**
   * The name to say "Hello" to.
   */
  @property()
  state: State = new State()


  render() {
    return html`
      <h2>Received</h2>
      ${this.state.messages.length > 0?html`
        ${this.state.messages.map(m => html`<div>${m.author} [${m.time}]: ${m.message}</div>`)}
      `:html`
        <h3>No messages received</h3>
      `}
    `
  }

}

declare global {
  interface HTMLElementTagNameMap {
    'chat-received': ChatReceived
  }
}
