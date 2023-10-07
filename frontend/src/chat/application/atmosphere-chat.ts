import { html, css, LitElement } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'
import Response = Atmosphere.Response;
import Request = Atmosphere.Request;

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
@customElement('atmosphere-chat')
export class AtmosphereChat extends LitElement {
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
  subsocket: Request | undefined

  private _onClick() {
    const msg = JSON.stringify({message: this.text!.value, author: 'yo', time: 0})
    console.log('sending', msg)
    if (this.subsocket && this.subsocket.push) {
      this.subsocket.push(msg);
    }
  }

  connectedCallback() {
    super.connectedCallback();

    const receive = (msg: string | undefined) => {
      this.received = [...this.received, {
        author: 'yo',
        message: '' + msg,
        time: 1
      }]
    }

    console.log('abriendo el socket')

    var socket = atmosphere;
    console.log('socket', socket)
    const request: Request = {
      url: 'http://localhost:8080/chat',
      contentType : "application/json",
      logLevel : 'debug',
      transport : 'websocket' ,
      fallbackTransport: 'long-polling'};

    request.onOpen = (response?: Response) => {
      console.log('opened', response)
    }
    request.onMessage = (response: Response) => {
      console.log('response', response)
      receive(response.responseBody)
    }
    request.onError = (response?: Response) => {
      console.log('error', response)
    }
    if (socket && socket.subscribe) {
      this.subsocket = socket.subscribe(request);
    }

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
    'atmosphere-chat': AtmosphereChat
  }
}
