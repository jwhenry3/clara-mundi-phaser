import { CoreUtils } from '@app/core'
import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await CoreUtils.connectRedis(app)
  await app.listen(3001)
}
bootstrap()
