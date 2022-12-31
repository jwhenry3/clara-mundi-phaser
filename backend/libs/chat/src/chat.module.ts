import { Module } from '@nestjs/common'

import { WebsocketModule } from '../../websocket/src/websocket.module'
import { ChatService } from './chat.service'

@Module({
  imports: [WebsocketModule],
  providers: [ChatService],
  exports: [ChatService],
})
export class ChatModule {}
