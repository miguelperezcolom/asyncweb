import { html, css, LitElement } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'
import {State} from "../domain/centralState";

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('chat-all')
export class ChatAll extends LitElement {
  static styles = css`
    :host {
      display: block;
      border: solid 1px gray;
      padding: 16px;
      max-width: 800px;
    }
  `

  @query('#text')
  text: HTMLInputElement | undefined

  /**
   * The name to say "Hello" to.
   */
  @property()
  state: State = new State()


  private _onClick() {
    this.dispatchEvent(new CustomEvent('send', {
      detail: {message: this.text!.value, author: 'yo', time: 0}
    }))
  }

  connectedCallback() {
    super.connectedCallback();



    console.log('abriendo el socket')



  }


  render() {
    return html`
      <h2>Received</h2>
      ${this.state.messages.map(m => html`<div>${m.author} [${m.time}]: ${m.message}</div>`)}
      <h2>Form</h2>
      <input type="text" id="text">
      <button @click=${this._onClick} part="button">Send</button>
      <slot></slot>
    `
  }

}

declare global {
  interface HTMLElementTagNameMap {
    'chat-all': ChatAll
  }
}
