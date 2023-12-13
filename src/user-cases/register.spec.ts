//ARQUIVO DE TESTE- NPM RUN TEST PARA VISUALIZAR//
//quando for testar de forma unitária, ou seja, por exemplo um email não vamos importar o banco de dados,
//isso pq vai dar conflito com todos itens, ou seja, nesse tipo de teste, não importar o banco de dados pois irá
//dar conflito com os itens no banco de dados, os itens salvos la, para testar a funcionalidade unitária nao e bom. 


import { expect, test, describe, it, beforeEach } from 'vitest'
import { RegisterUserCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exist-error'

//crio as constantes para serem acessadas no teste, de forma GLOBAL (usando let)

let usersRepository: InMemoryUsersRepository
let sut: RegisterUserCase

describe('Register Use Case', () =>  {
//função para constante ser acessada em todos testes, consatnte global criada acima
beforeEach(() => {
usersRepository = new InMemoryUsersRepository()
sut = new RegisterUserCase(usersRepository)
})
    //TESTE PARA VALIDAR QUE VAI DAR TUDO CERTO NO CADASTRO
    it ('Should be able to register', async () => {
        //consante criada para acessar os testes salvos no in memory, criada aqui nao precisa nos outros testes
         
   
        const { user } = await sut.execute({ //crio a constante em objeto user, q foi criado no documetno register.ts
            name: 'John',
            email: 'john@hotmail.com',
            password: '123456'
        })
        
        //Eu espero que O ID do usuário retornado seja igual a qualquer STRING
        expect(user.id).toEqual(expect.any(String)) 


        })


    //TESTE PARA NÃO REPETIR O HASH:
    //A senha do usuário deve ser hash assim q ele se cadastrar
it ('Should hash user password upon registration', async () => {
//consante criada para acessar os testes salvos no in memory

 
const { user } = await sut.execute({ //crio a constante em objeto user, q foi criado no documetno register.ts
    name: 'John',
    email: 'john@hotmail.com',
    password: '123456'
})

//para verificar se o hash da senha foi corretamente feito, ele compara com um hash ja existente (compare)
const isPasswordCorrectHashed = await compare(
    '123456',
    user.password_hash
)
//espero q o hash seja true, igual
expect (isPasswordCorrectHashed).toBe(true)


})

//TESTE PARA NÃO CRIAR USUÁRIO COM EMAIL REPETIDO 

it ('Should not able to register with same email twice', async () => {
    //consante criada para acessar os testes salvos no in memory
      

        const email =  'john@hotmail.com'
        
        await sut.execute({
            name: 'John doe',
            email,
            password: '123456' 
        })

        /* descrição codigo abaixo eu espero (expect) que na proxima vez que eu chamar o RegisterUseCase
        (que retorna uma promise ou resolve ou rejeita) terminar de executar, ela rejeite(de erro) e quero q o resultado
        seja uma instancia do user already exists
        
*/
  
await expect(() =>{
       return sut.execute({
        name: 'John Doe',
        email,
        password: '123456',
      })
      
    }).rejects.toBeInstanceOf(UserAlreadyExistsError)
        

    })










})
