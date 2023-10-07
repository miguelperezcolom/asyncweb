import {html, LitElement} from 'lit'
import {customElement, query} from 'lit/decorators.js'

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('chat-implementation-selector')
export class ChatImplementationSelector extends LitElement {

  @query('#selector')
  select: HTMLSelectElement | undefined

  private _onChange() {
    this.dispatchEvent(new CustomEvent('change-implementation', {
      detail: this.select!.value
    }))
  }

  render() {
    return html`
      <h2>Implementation</h2>
      <select id="selector" @change="${this._onChange}">
        <option value="atmosphere">Atmosphere</option>
        <option value="socketio">Socket IO</option>
        <option value="custom">Custom</option>
      </select>
    `
  }

}

declare global {
  interface HTMLElementTagNameMap {
    'chat-implementation-selector': ChatImplementationSelector
  }
}
