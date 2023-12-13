import { FastifyRequest, FastifyReply } from "fastify"
//importa o zod para fazer conferencia de todos itens colocados
import { z } from 'zod'
import { UserAlreadyExistsError } from "@/user-cases/errors/user-already-exist-error"
import { makeRegisterUseCase } from "@/user-cases/factories/make-register-use-case"



export async function register(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
    })
     const { name, email, password } = registerBodySchema.parse(request.body)

    try {
        //criado no factory make register usercase
        const registerUseCase = makeRegisterUseCase()
        
        //para usar abaixo preciso criar uma constante para instanciar o RegisterUseCase do repositório (criei acima)
        await registerUseCase.execute({
            name, 
            email,
            password,
        })

    } catch (err) {
        //se o erro que ocorrer for de instancia de email, coloco aqui o erro 
        if (err instanceof UserAlreadyExistsError ){
            //ai retorna erro abaixo 
            return reply.status(409).send({message: err.message})
        }
    //SE NÃO FOR UM ERRO CONHECIDO:
    throw err
    }
    
    return reply.status(201).send()
    
    }
    