import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
import { UserModule } from './user/user.module';


@Module({
  imports: [CustomerModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
