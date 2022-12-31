import { Injectable } from '@nestjs/common';

@Injectable()
export class LoginServerService {
  getHello(): string {
    return 'Hello World!';
  }
}
