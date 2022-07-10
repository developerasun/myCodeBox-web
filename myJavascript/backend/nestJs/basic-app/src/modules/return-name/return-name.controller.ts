import { Controller, Get } from '@nestjs/common';
import { ReturnNameService } from './return-name.service';

@Controller('return-name')
export class ReturnNameController {
  constructor(private returnNameService: ReturnNameService) {}

  @Get('/')
  getName() {
    return this.returnNameService.getName();
  }
}
