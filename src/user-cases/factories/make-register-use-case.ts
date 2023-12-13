/*FACTORY- UM DESIGN PATTERN - é um documento que CRIA o repositório, ao inves de em todo documento ter
que criar um pra acessar:
const usersRepository = new PrismaUsersRepository() 
const registerUserCase = new RegisterUserCase (usersRepository) - PARA EXECUTAR ESSE, TEM Q ACESSAR O DE CIMA.
ENTAO O FACTORY cria essa documetno r´pa substituir o acesso ao repositório.*/

import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { RegisterUserCase } from "../register"

//devolve caso de uso, ja com todas dependencias.

export function makeRegisterUseCase() {
    const usersRepository = new PrismaUsersRepository()
    const registerUserCase = new RegisterUserCase (usersRepository)

    return registerUserCase
}