import { Server } from 'ws'

import { WebSocketClient } from './websocket.client'

export class WebSocketMessage {
  constructor(public event: string, public data: any) {}
}
export class WebsocketUtils {
  static broadcast(clients: WebSocketClient[], event: string) {
    for (const client of clients) {
      client.send(event)
    }
  }
  static send(client: WebSocketClient, { event, data }: WebSocketMessage) {
    client.send(
      JSON.stringify({
        event,
        data: typeof data === 'string' ? data : JSON.stringify(data),
      }),
    )
  }
}
