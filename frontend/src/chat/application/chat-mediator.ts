import { html, css, LitElement } from 'lit'
import { customElement } from 'lit/decorators.js'
import './chat-all'

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



  connectedCallback() {
    super.connectedCallback();


  }


  render() {
    return html`
      <chat-all></chat-all>
    `
  }

}

declare global {
  interface HTMLElementTagNameMap {
    'chat-mediator': ChatMediator
  }
}
