import { AuthModule } from '@app/auth'
import { CoreUtils } from '@app/core'
import { DatabaseModule } from '@app/database'
import { Module } from '@nestjs/common'

import { PartyServerController } from './party-server.controller'
import { PartyServerService } from './party-server.service'

@Module({
  imports: [AuthModule, CoreUtils.importClient('PARTY_SERVICE')],
  controllers: [PartyServerController],
  providers: [PartyServerService],
})
export class PartyServerModule {
  static forRoot() {
    return {
      module: PartyServerModule,
      imports: [DatabaseModule],
    }
  }
}
