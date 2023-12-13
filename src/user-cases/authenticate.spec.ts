import { expect,  describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from '@/user-cases/authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'



let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () =>  {

    beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository) 
    })

    //AUTENTICAR USUARIO

    it ('Should be able to authenticate', async () => {

        
        await usersRepository.create({
            name:'john doe',
            email:'john@hotmail.com',
            password_hash: await hash ('123456',6),
        })

          
        const { user } = await sut.execute ({ 
            email: 'john@hotmail.com',
            password: '123456'
        })

        expect(user.id).toEqual(expect.any(String)) 


        })

        //AUTENTICAR SE O EMAIL TA CERTO

        it ('Should not be able to authenticate with wrong email', async () => {
              
            expect(() => sut.execute({
                email:'john@hotmail.com',
                password:'123456',
            })).rejects.toBeInstanceOf(InvalidCredentialsError)
    
            })

            it ('Should be able to authenticate with wrong password ', async () => {


            await usersRepository.create({
                name:'john doe',
                email:'john@hotmail.com',
                password_hash: await hash ('123456',6),
            })
    
              
            const { user } = await sut.execute ({ 
                email: 'john@hotmail.com',
                password: '123456'
            })
            expect(() => sut.execute({
                email:'john@hotmail.com',
                password:'123476',
            })).rejects.toBeInstanceOf(InvalidCredentialsError)
         
    
    
            })

    })

