import { AuthModule } from '@app/auth'
import { CharacterModule } from '@app/character'
import { ChatModule } from '@app/chat'
import { CoreUtils } from '@app/core'
import { DatabaseModule } from '@app/database'
import { Module } from '@nestjs/common'

import { ChatServerController } from './chat-server.controller'
import { ChatServerService } from './chat-server.service'
import { ChatGateway } from './chat.gateway'

@Module({
  imports: [
    AuthModule,
    ChatModule,
    CharacterModule,
    CoreUtils.importClient('CHAT_SERVICE'),
  ],
  controllers: [ChatServerController],
  providers: [ChatServerService, ChatGateway],
})
export class ChatServerModule {
  static forRoot() {
    return {
      module: ChatServerModule,
      imports: [DatabaseModule],
    }
  }
}
