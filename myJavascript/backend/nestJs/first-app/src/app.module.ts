import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';


@Module({
  imports: [CustomerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
