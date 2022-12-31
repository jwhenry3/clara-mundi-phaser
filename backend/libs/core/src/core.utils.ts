import { INestApplication } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'

export class CoreUtils {
  static getMicroserviceConfig() {
    return {
      transport: Transport.REDIS,
      options: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT),
      },
    }
  }
  static async connectRedis(app: INestApplication) {
    const microservice = app.connectMicroservice({
      transport: Transport.REDIS,
      options: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT),
      },
    })
    await app.startAllMicroservices()
  }
  static importClient(serviceName: string) {
    return ClientsModule.register([
      {
        name: serviceName,
        transport: Transport.REDIS,
        options: {
          host: process.env.REDIS_HOST,
          port: parseInt(process.env.REDIS_PORT),
        },
      },
    ])
  }
}
