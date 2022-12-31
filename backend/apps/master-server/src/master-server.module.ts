import { AuthModule } from '@app/auth'
import { CoreUtils } from '@app/core'
import { DatabaseModule } from '@app/database'
import { Module } from '@nestjs/common'

import { MasterServerController } from './master-server.controller'
import { MasterServerGateway } from './master-server.gateway'
import { MasterServerService } from './master-server.service'

@Module({
  imports: [AuthModule, CoreUtils.importClient('MASTER_SERVER_SERVICE')],
  controllers: [MasterServerController],
  providers: [MasterServerService, MasterServerGateway],
})
export class MasterServerModule {
  static forRoot() {
    return {
      module: MasterServerModule,
      imports: [DatabaseModule],
    }
  }
}
