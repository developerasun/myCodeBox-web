import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { SerializeUser } from 'src/user/types/user';

@Injectable()
export class UserService {
    private users = [
        { 
            username : 'danny',
            password: '123'
        },
        { 
            username : 'paul',
            password: 'asdf'
        },
        { 
            username : 'jake',
            password: 'eoeo'
        },
    ]

    getUsers() {
        // plainToClass: Converts plain (literal) object to class (constructor) object. Also works with arrays.
        return this.users.map((user)=>plainToInstance(SerializeUser, user))
    }

    getUserByUsername(username: string) {
        return this.users.find((item) => item.username===username) 
    }
}
