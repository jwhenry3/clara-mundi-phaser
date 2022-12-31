import { CoreUtils } from '@app/core'
import { config } from '@app/core'
import { NestFactory } from '@nestjs/core'

import { LoginServerModule } from './login-server.module'

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    LoginServerModule.forRoot(),
    CoreUtils.getMicroserviceConfig()
  )
  await app.listen()
}
bootstrap()
