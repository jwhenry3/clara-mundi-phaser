import { CoreUtils } from '@app/core'
import { config } from '@app/core'
import { NestFactory } from '@nestjs/core'

import { QuestServerModule } from './quest-server.module'

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    QuestServerModule.forRoot(),
    CoreUtils.getMicroserviceConfig()
  )
  await app.listen()
}
bootstrap()
