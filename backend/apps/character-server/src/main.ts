import { CoreUtils } from '@app/core'
import { config } from '@app/core'
import { NestFactory } from '@nestjs/core'

import { CharacterServerModule } from './character-server.module'

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    CharacterServerModule.forRoot(),
    CoreUtils.getMicroserviceConfig()
  )
  await app.listen()
}
bootstrap()
