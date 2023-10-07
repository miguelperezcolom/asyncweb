import { html, css, LitElement } from 'lit'
import { customElement} from 'lit/decorators.js'
import './chat/application/chat-mediator'
/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('my-element')
export class MyElement extends LitElement {
  static styles = css`
    :host {
      display: block;
      border: solid 1px gray;
      padding: 16px;
      max-width: 800px;
    }
  `


  render() {
    return html`
      <h2>Chat demo</h2>
      
      <chat-mediator></chat-mediator>
      
      
    `
  }

}

declare global {
  interface HTMLElementTagNameMap {
    'my-element': MyElement
  }
}
