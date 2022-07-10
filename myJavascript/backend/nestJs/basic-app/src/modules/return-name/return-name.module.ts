import { Module } from '@nestjs/common';
import { ReturnNameService } from './return-name.service';
import { ReturnNameController } from './return-name.controller';

@Module({
  providers: [ReturnNameService],
  controllers: [ReturnNameController],
})
export class ReturnNameModule {}
