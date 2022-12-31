import { CoreUtils } from '@app/core'
import { config } from '@app/core'
import { NestFactory } from '@nestjs/core'
import { WsAdapter } from '@nestjs/platform-ws'

import { ChatServerModule } from './chat-server.module'

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    ChatServerModule.forRoot(),
    CoreUtils.getMicroserviceConfig()
  )
  await app.listen()
}
bootstrap()
