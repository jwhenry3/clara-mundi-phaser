import { AuthService } from '@app/auth'
import { config } from '@app/core'
import { WebSocketClient, WebsocketUtils } from '@app/websocket'
import { ConnectedSocket, WebSocketServer } from '@nestjs/websockets'
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets'
import { create } from 'guid'
import { Server } from 'ws'

const url = require('url')
export interface ServerEntry {
  label: string
  region: string
  host: string
  port: number
  status: boolean
  playerCapacity: number
  currentPlayers: number
}
@WebSocketGateway(config.master.wsPort)
export class MasterServerGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  static instance: MasterServerGateway
  serverList: Record<string, ServerEntry> = {}

  @WebSocketServer()
  server: Server

  authorized: WebSocketClient[] = []

  serversByClient: Record<string, ServerEntry> = {}

  constructor(private auth: AuthService) {
    MasterServerGateway.instance = this
  }

  handleDisconnect(client: WebSocketClient) {
    const index = this.authorized.indexOf(client)
    if (index > -1) this.authorized.splice(index, 1)
    if (client.id in this.serversByClient) {
      const server = this.serversByClient[client.id]
      server.status = false
      delete this.serversByClient[client.id]
    }
  }

  handleConnection(client: any, message: any) {
    const parameters = url.parse(message.url, true)
    if (!this.auth.validateServer(parameters.query.token as string)) {
      client.close(1008)
      return
    }
    client.id = create().toString()
    if (!this.authorized.includes(client)) this.authorized.push(client)
    client.send(JSON.stringify({ event: 'authorized', data: '' }))
  }

  @SubscribeMessage('update')
  handleAuth(@ConnectedSocket() client: any, @MessageBody() body: string) {
    let host = ''
    const hostParts = client._socket.remoteAddress.split(':')
    if (client._socket.remoteAddress === '::1') host = '127.0.0.1'
    else host = hostParts.pop()
    const data = JSON.parse(body) as ServerEntry
    const entry: ServerEntry = {
      label: data.label,
      region: data.region,
      host: host,
      port: data.port,
      status: true,
      playerCapacity: data.playerCapacity ?? 0,
      currentPlayers: data.currentPlayers ?? 0,
    }
    this.serversByClient[client.id] = entry
    MasterServerGateway.instance.serverList[data.label] = entry
  }
}
