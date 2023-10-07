import { html, css, LitElement } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'
//import 'atmosphere.js'

//import {atmosphere} from './atmosphere'

interface Message {
  message: string
  author: string
  time: number
}

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

  @query('#text')
  text: HTMLInputElement | undefined

  /**
   * The name to say "Hello" to.
   */
  @property()
  received: Message[] = []

  socket: WebSocket | undefined

  private _onClick() {
    const msg = JSON.stringify({message: this.text!.value, author: 'yo', time: 0})
    console.log('sending', msg)
    this.socket?.send(msg);
  }

  connectedCallback() {
    super.connectedCallback();

    console.log('abriendo el socket')

    // Create WebSocket connection.
    this.socket = new WebSocket("ws://localhost:8080/chat");

// Connection opened
    this.socket.addEventListener("open", (event) => {
      console.log('opened', event)
      const msg = JSON.stringify({message: 'hola', author: 'yo', time: 0})
      console.log('sending', msg)
      this.socket?.send(msg);
    });

// Listen for messages
    const receive = (msg: string | undefined) => {
      this.received = [...this.received, {
        author: 'yo',
        message: '' + msg,
        time: 1
      }]
    }

    this.socket.onerror = (error: any) => {console.log('error', error)}

    this.socket.addEventListener("message", (event) => {
      console.log("Message from server ", event.data);
      receive(event.data)
    });

  }


  render() {
    return html`
      <h2>Received</h2>
      ${this.received.map(m => html`<div>${m.author} [${m.time}]: ${m.message}</div>`)}
      <h2>Form</h2>
      <input type="text" id="text">
      <button @click=${this._onClick} part="button">Send</button>
      <slot></slot>
    `
  }

}

declare global {
  interface HTMLElementTagNameMap {
    'my-element': MyElement
  }
}
