import { Exclude } from "class-transformer"

export interface User {
    username: string
    password: string
}

export class SerializeUser {
    id: number
    username: string

    @Exclude() // Marks the given class or property as excluded
    password:string;

    constructor(partial: Partial<SerializeUser>){
        Object.assign(this, partial)
    }
}