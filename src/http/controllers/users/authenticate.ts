
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { InvalidCredentialsError } from '@/user-cases/errors/invalid-credentials-error'
import { makeAuthenticateUseCase } from '@/user-cases/factories/make-authenticate-use-case'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const authenticateUseCase = makeAuthenticateUseCase()

    const { user } = await authenticateUseCase.execute({
      email,
      password,
    })

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
        },
      },
    )

    //refresh token, para o token atualizar
    const refreshToken = await reply.jwtSign(
      {
        role: user.role,
      },
      {
        sign: {
          sub: user.id,
          expiresIn:'7d', // se ficar 7 dias sem entrar, nem o refresh token atualiza, 
        },
      },
    )


    return reply
    .setCookie('refreshToken', refreshToken, {
      path:'/',  //quais rotas backend vao ter acesso ao cookie
      secure: true, //front end n consegue ler o valor do cooking
      sameSite: true,
      httpOnly: true, //acessado somente pelo backend
    })
    .status(200)
    .send({
      token,
    })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}




/*import { FastifyRequest, FastifyReply } from "fastify"
//importa o zod para fazer conferencia de todos itens colocados
import { z } from 'zod'
import { InvalidCredentialsError } from "@/user-cases/errors/invalid-credentials-error"
import { makeAuthenticateUseCase } from "@/user-cases/factories/make-authenticate-use-case"



export async function authenticate (request: FastifyRequest, reply: FastifyReply) {
    const authenticateBodySchema = z.object({
         email: z.string().email(),
        password: z.string().min(6),
    })
     const { email, password } = authenticateBodySchema.parse(request.body)

    try {

      const authenticateUseCase = makeAuthenticateUseCase()
      
    
        //para usar abaixo preciso criar uma constante para instanciar o RegisterUseCase do repositório (criei acima)
       const {user} = await authenticateUseCase.execute({
            email,
            password,
        })

        const token = await reply.jwtSign({}, {
            sign: {
                sub: user.id
            },
        },
        )

        return reply.status(200).send({
            token,
        })

    } catch (err) {
        //se o erro que ocorrer for de instancia de email, coloco aqui o erro 
        if (err instanceof InvalidCredentialsError ){
            //ai retorna erro abaixo 
            return reply.status(409).send({message: err.message})
        }
    //SE NÃO FOR UM ERRO CONHECIDO:
    throw err
    }
    
    return reply.status(200).send()
    
    }
    */