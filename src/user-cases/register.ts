
//documento criado para desacoplar essa função, hoje estamos criando em rota http mas caso
//eu quiser criar de outra maneira, esse desacoplamento irá ajudar. 
//os dados NAO ficam salvos no banco dados, mas sim neste documento. 


import { UsersRepository } from "@/repositories/user-repository";
import { hash } from "bcryptjs"
import { UserAlreadyExistsError } from "./errors/user-already-exist-error";
import { User } from "@prisma/client";


interface RegisterUseCaseRequest {
    name: string;
    email: string;
    password: string;
}

interface RegisterUseCaseResponse {
    user: User 
}

export class RegisterUserCase {
   //crio um constructor para receber as dependencias (prisma) via parametro (principio D inversao de dependencias)
    constructor(private usersRepository: UsersRepository){}
  
    async execute ({ //criar uma variavel password hash com o metodo em si
        name,
        email, 
        password
        }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> { 
        
        const password_hash = await hash(password, 6)
        
        //para conferir se ja há um usuário cadastrado com o mesmo email
        const userWithSameEmail = await this.usersRepository.findByEmail(email)
        
        //caso existir usuário com mesmo email, o retorno sera um erro
        if(userWithSameEmail) {
        //coloco aqui a constante que criei no documento de erro de email
        throw new UserAlreadyExistsError()
        }
        const user = await this.usersRepository.create({
            name,
            email, 
            password_hash
        })

        return {user} 
    }
}


/*
PRINCIPIOS SOLID: Conjunto de 5 principios 
(DE TRAS PRA FRENTE)

S- Single Reponsability Principle- Determina que cada classe cada arquivo tenha uma unica só responsabilidade, 
executar somente uma tarefa. Ex: 

D - Dependency Inversion Principle */ 