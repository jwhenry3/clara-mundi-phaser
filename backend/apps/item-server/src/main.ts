import { config, CoreUtils } from '@app/core'
import { NestFactory } from '@nestjs/core'

import { ItemServerModule } from './item-server.module'

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    ItemServerModule.forRoot(),
    CoreUtils.getMicroserviceConfig()
  )
  await app.listen()
}
bootstrap()
