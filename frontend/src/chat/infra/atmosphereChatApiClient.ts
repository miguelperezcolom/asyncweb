import {ChatApiClient} from "../domain/apiClients/chatApiClient";
import {Message} from "../domain/model/Message";
import Response = Atmosphere.Response;
import Request = Atmosphere.Request;
import {connectedStream, errorStream, msgStream} from "../domain/streams/domainStreams";

export class AtmosphereChatApiClient implements ChatApiClient {

    socket: WebSocket | undefined
    subsocket: Request | undefined

    constructor() {

        var socket = atmosphere;
        console.log('socket', socket)
        const request: Request = {
            url: 'http://atmosphere.mateu.io/chat',
            contentType : "application/json",
            logLevel : 'debug',
            transport : 'websocket' ,
            fallbackTransport: 'long-polling'};

        request.onOpen = (response?: Response) => {
            console.log('opened', response)
            connectedStream.next(response)
        }
        request.onMessage = (response: Response) => {
            console.log('response', response)
            msgStream.next({
                author: 'yo',
                message: '' + response.responseBody,
                time: 1
            })
        }
        request.onError = (response?: Response) => {
            console.log('error', response)
            errorStream.next(response)
        }
        if (socket && socket.subscribe) {
            this.subsocket = socket.subscribe(request);
        }

    }

    send(msg: Message): void {
        const raw = JSON.stringify(msg)
        if (this.subsocket && this.subsocket.push) {
            console.log('sending', raw)
            this.subsocket.push(raw)
        } else {
            console.log('NOT sending', raw)
        }

    }

    unbind(): void {
        if (atmosphere && atmosphere.unsubscribe) {
            atmosphere.unsubscribe()
        }
    }

}