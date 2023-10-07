import { html, css, LitElement } from 'lit'
import { customElement} from 'lit/decorators.js'
import './chat/application/chat-app'
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
      <h1>Chat demo</h1>
      
      <chat-app></chat-app>
      
      
    `
  }

}

declare global {
  interface HTMLElementTagNameMap {
    'my-element': MyElement
  }
}
