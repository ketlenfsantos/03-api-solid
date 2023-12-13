

import { Prisma, User } from "@prisma/client";


// uma interface que vai dizer quais metodos vao existir no repositório (register.ts), quais parametros

export interface UsersRepository { 
    findById(id:string): Promise<User | null>
    findByEmail(email: string): Promise<User | null>
    create(data: Prisma.UserCreateInput): Promise<User>
}
