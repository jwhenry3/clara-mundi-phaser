import { config, CoreUtils } from '@app/core'
import { NestFactory } from '@nestjs/core'

import { PartyServerModule } from './party-server.module'

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    PartyServerModule.forRoot(),
    CoreUtils.getMicroserviceConfig()
  )
  await app.listen()
}
bootstrap()
