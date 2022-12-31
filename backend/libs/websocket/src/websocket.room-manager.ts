import { WebSocketClient } from './websocket.client'
import { Room } from './websocket.room'
import { WebSocketMessage } from './websocket.utils'

export class WebsocketRoomManager {
  rooms: Record<string, Room> = {}

  openRoom(name: string) {
    if (name in this.rooms) return false
    this.rooms[name] = new Room(name)
    return true
  }

  joinRoom(client: WebSocketClient, name: string) {
    if (!(name in this.rooms)) this.openRoom(name)
    return this.rooms[name].join(client)
  }
  leaveRoom(client: WebSocketClient, name: string) {
    if (!(name in this.rooms)) return false
    return this.rooms[name].leave(client)
  }

  closeRoom(name: string) {
    if (!(name in this.rooms)) return false
    return this.rooms[name].close()
  }

  clientSendToRoom(
    client: WebSocketClient,
    name: string,
    message: WebSocketMessage,
  ) {
    if (!(name in this.rooms)) return false
    if (this.rooms[name].hasMember(client.id)) return false
    this.serverSendToRoom(name, message)
  }
  serverSendToRoom(name: string, message: WebSocketMessage) {
    if (!(name in this.rooms)) return false
    this.rooms[name].send(message)
  }
}
