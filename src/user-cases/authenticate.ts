import { UsersRepository } from '@/repositories/user-repository'
import { InvalidCredentialsError } from '@/user-cases/errors/invalid-credentials-error'
import { User } from '@prisma/client'
import { compare } from 'bcryptjs'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  user: User
}

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doestPasswordMatches = await compare(password, user.password_hash)

    if (!doestPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      user,
    }
  }
}








/*

// Autenticação para comprovar veracidade das informações 
import { UsersRepository } from "@/repositories/user-repository";
import { InvalidCredentialsError } from "./user-cases/errors/invalid-credentials-error";
import { compare } from "bcryptjs";
import { User } from "@prisma/client";
//tipagem de entrada: oq a pessoa precisa enviar pra realizar a autenticação
interface AuthenticateUseCaseRequest {
//pra autenticar, preciso do email e senha da pessoa
email:string
password:string
}
//e o que espero receber daqui de dentro pra saber se usuário foi ou não autenticado 
interface AuthenticateUseCaseResponse {
    user: User
}

export class AuthenticateUseCase {
    //construtor com as dependencias de caso de uso
constructor(
 //autenticar um usuário:
 //acessar banco de dados +
 private usersRepository: UsersRepository,   
){}    
//método abaixo faz a execução da autenticação
//quero atenticar email, password e usar objeto request pra receber, retorna uma promise com o resultado
async execute({email, password}: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse>{
//para verificar se a senha está válida, criar um novo hash e comparar com a que tinha salva. 
const user = await this.usersRepository.findByEmail(email)

if(!user){
//o retorno do erro vem do invalid credentials
    throw new InvalidCredentialsError()
}
//caso o usuário existir, cria uma constante para comparar as senhas


const doesPasswordMatches = await compare(password, user.password_hash)

if(!doesPasswordMatches){
    throw new InvalidCredentialsError()
}

return {
    user,
}

}
}

*/