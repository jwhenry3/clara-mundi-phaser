import { Injectable } from '@nestjs/common';

@Injectable()
export class PartyServerService {
  getHello(): string {
    return 'Hello World!';
  }
}
