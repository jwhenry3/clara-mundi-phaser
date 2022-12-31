import { AuthModule } from '@app/auth'
import { CharacterModule } from '@app/character'
import { CoreUtils } from '@app/core'
import { DatabaseModule } from '@app/database'
import { Module } from '@nestjs/common'

import { LoginServerController } from './login-server.controller'
import { LoginServerService } from './login-server.service'

@Module({
  imports: [
    AuthModule,
    CharacterModule,
    CoreUtils.importClient('LOGIN_SERVICE'),
  ],
  controllers: [LoginServerController],
  providers: [LoginServerService],
})
export class LoginServerModule {
  static forRoot() {
    return {
      module: LoginServerModule,
      imports: [DatabaseModule],
    }
  }
}
