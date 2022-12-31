import { config } from '@app/core'
import { CoreUtils } from '@app/core'
import { NestFactory } from '@nestjs/core'
import { WsAdapter } from '@nestjs/platform-ws'

import { MasterServerModule } from './master-server.module'

async function bootstrap() {
  const app = await NestFactory.create(MasterServerModule.forRoot())
  app.useWebSocketAdapter(new WsAdapter(app))
  await CoreUtils.connectRedis(app)
  await app.listen(config.master.httpPort)
}
bootstrap()
