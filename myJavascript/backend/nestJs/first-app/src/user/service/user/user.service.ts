import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { SerializeUser } from 'src/user/types/user';

@Injectable()
export class UserService {
    private users = [
        { 
            id: 1,
            username : 'danny',
            password: '123'
        },
        { 
            id: 2,
            username : 'paul',
            password: 'asdf'
        },
        { 
            id: 3,
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

    getUserById(id:number) {
        return this.users.find((item)=> item.id === id)
    }
}
