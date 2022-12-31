import { CoreUtils } from '@app/core'
import { NestFactory } from '@nestjs/core'
import { IoAdapter } from '@nestjs/platform-socket.io'

import { ProxyServerModule } from './proxy-server.module'

async function bootstrap() {
  const app = await NestFactory.create(ProxyServerModule)
  app.useWebSocketAdapter(new IoAdapter(app))
  await CoreUtils.connectRedis(app)
  await app.listen(3001)
}
bootstrap()
