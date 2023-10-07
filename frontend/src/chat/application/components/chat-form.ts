import {html, LitElement} from 'lit'
import {customElement, query} from 'lit/decorators.js'

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('chat-form')
export class ChatForm extends LitElement {

  @query('#text')
  text: HTMLInputElement | undefined

  private _onClick() {
    this.dispatchEvent(new CustomEvent('send', {
      detail: {message: this.text!.value, author: 'yo', time: 0}
    }))
  }

  render() {
    return html`
      <h2>Form</h2>
      <input type="text" id="text">
      <button @click=${this._onClick} part="button">Send</button>
    `
  }

}

declare global {
  interface HTMLElementTagNameMap {
    'chat-form': ChatForm
  }
}
