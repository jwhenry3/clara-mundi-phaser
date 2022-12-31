import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { DatabaseService } from './database.service'
import { SSL } from './ssl'

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.TYPEORM_HOST,
      port: parseInt(process.env.TYPEORM_PORT),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      synchronize: true,
      autoLoadEntities: true,
      ssl: {
        ca: SSL,
      },
    }),
  ],
  providers: [DatabaseService],
  exports: [DatabaseService, TypeOrmModule, ConfigModule],
})
export class DatabaseModule {}
