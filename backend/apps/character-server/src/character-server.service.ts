import { Injectable } from '@nestjs/common';

@Injectable()
export class CharacterServerService {
  getHello(): string {
    return 'Hello World!';
  }
}
