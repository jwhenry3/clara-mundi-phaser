import { Subject, takeUntil } from 'rxjs'

import { WebSocketClient } from './websocket.client'
import { WebSocketMessage, WebsocketUtils } from './websocket.utils'

export class RoomMember {
  onLeave = new Subject<void>()

  constructor(public client: WebSocketClient) {}
}
export class Room {
  onClose = new Subject<void>()
  events = new Subject<WebSocketMessage>()
  clients: Record<string, RoomMember> = {}
  constructor(public name: string) {}

  join(client: WebSocketClient) {
    if (client.id in this.clients) return false
    this.clients[client.id] = new RoomMember(client)
    WebsocketUtils.send(
      this.clients[client.id].client,
      new WebSocketMessage('room:join', `{"room":"${this.name}"}`),
    )
    this.events
      .pipe(takeUntil(this.clients[client.id].onLeave))
      .pipe(takeUntil(this.onClose))
      .subscribe(({ event, data }) => this.sendTo(client.id, { event, data }))
    return true
  }
  leave(client: WebSocketClient) {
    if (!(client.id in this.clients)) return false
    WebsocketUtils.send(
      this.clients[client.id].client,
      new WebSocketMessage('room:leave', `{"room":"${this.name}"}`),
    )
    this.clients[client.id].onLeave.next()
    delete this.clients[client.id]
    return true
  }

  send(message: WebSocketMessage) {
    this.events.next(message)
  }
  sendTo(id: string, message: WebSocketMessage) {
    if (!(id in this.clients)) return false
    WebsocketUtils.send(this.clients[id].client, message)
    return true
  }
  close() {
    this.send(new WebSocketMessage('room:close', `{"room":"${this.name}"}`))
    this.onClose.next()
    this.clients = {}
  }

  hasMember(id: string) {
    return id in this.clients
  }
}
