
import fastifyJwt from '@fastify/jwt'
import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from '@/env'
import { usersRoutes } from './http/controllers/users/routes'
import { gymsRoutes } from './http/controllers/gyms/routes'
import { checkInsRoutes } from './http/controllers/check-ins/routes'
import fastifyCookie from '@fastify/cookie'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie : {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn:'10m', 
  }
})

app.register(fastifyCookie)

app.register(usersRoutes)
app.register(gymsRoutes)
app.register(checkInsRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Here we should log to a external tool like DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})






/*importar a biblioteca do fastify
import fastify from "fastify";
import { appRoutes } from "./http/routes";
import { ZodError } from "zod";
import fastifyJwt from "@fastify/jwt";
import { env } from "./env";

//criar e exportar a aplicação
export const app = fastify()

//JWT TOKEN DE USUÁRIOS E SENHAS
app.register(fastifyJwt,{
    secret: env.JWT_SECRET,
})

app.register(appRoutes)

//CRIAÇÃO DE UMA FUNÇÃO GLOBAL PARA LIDAR COM OS ERROS. 

app.setErrorHandler((error, request, reply) => {
    //se for um erro de validação de infos
if (error instanceof ZodError){
    return reply
    .status(400)
    .send({message: 'Validation Error' , issues: error.format()})
}
 if (env.NODE_ENV !== 'production'){
    console.error(error) //para ver ONDE ta o erro 
 }

return reply.status(500).send({ message: 'Internal server error '})
})*/