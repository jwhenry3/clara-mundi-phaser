import { Injectable } from '@nestjs/common';

@Injectable()
export class MasterServerService {
  getHello(): string {
    return 'Hello World!';
  }
}
