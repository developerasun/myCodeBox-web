import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomerService {

    users = [
        { 
            id:1, 
            email: 'danny@gmail.com', 
            name : 'danny',
            createdAt: new Date()
        },
        { 
            id:2, 
            email: 'jake@gmail.com', 
            name : 'jake',
            createdAt: new Date()
        },
        { 
            id:3, 
            email: 'paul@gmail.com', 
            name : 'paul',
            createdAt: new Date()
        }
    ]
    findCustomerById(id:number) {
        return this.users.find((item) => id === item.id)
    }
}
