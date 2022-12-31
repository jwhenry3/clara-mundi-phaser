import { AuthModule } from '@app/auth'
import { CharacterModule } from '@app/character'
import { CoreUtils } from '@app/core'
import { DatabaseModule } from '@app/database'
import { Module } from '@nestjs/common'

import { CharacterServerController } from './character-server.controller'
import { CharacterServerService } from './character-server.service'

@Module({
  imports: [
    AuthModule,
    CharacterModule,
    CoreUtils.importClient('CHARACTER_SERVICE'),
  ],
  controllers: [CharacterServerController],
  providers: [CharacterServerService],
})
export class CharacterServerModule {
  static forRoot() {
    return {
      module: CharacterServerModule,
      imports: [DatabaseModule],
    }
  }
}
