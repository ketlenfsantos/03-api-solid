import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { AuthenticateUseCase } from "@/user-cases/authenticate"

//devolve caso de uso, ja com todas dependencias.

export function makeAuthenticateUseCase() {
    const usersRepository = new PrismaUsersRepository()
    const authenticateUseCase = new AuthenticateUseCase (usersRepository)

    return authenticateUseCase
}