import { Module } from '@nestjs/common';
import { CustomerController } from './controller/customer/customer.controller';
import { CustomerService } from './service/customer/customer.service';

@Module({
    imports:[], 
    controllers:[CustomerController], // handling request and response
    providers:[CustomerService]
})

export class CustomerModule {}
