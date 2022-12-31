import { AuthModule } from '@app/auth'
import { DatabaseModule } from '@app/database'
import { Module } from '@nestjs/common'
import { CharacterServerModule } from 'apps/character-server/src/character-server.module'
import { ChatServerModule } from 'apps/chat-server/src/chat-server.module'
import { ItemServerModule } from 'apps/item-server/src/item-server.module'
import { LoginServerModule } from 'apps/login-server/src/login-server.module'
import { PartyServerModule } from 'apps/party-server/src/party-server.module'
import { ProxyServerModule } from 'apps/proxy-server/src/proxy-server.module'
import { QuestServerModule } from 'apps/quest-server/src/quest-server.module'

import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [
    AuthModule,
    CharacterServerModule,
    ChatServerModule,
    ItemServerModule,
    PartyServerModule,
    QuestServerModule,
    LoginServerModule,
    DatabaseModule,
    ProxyServerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
