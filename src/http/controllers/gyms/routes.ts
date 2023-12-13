// ROTAS ESPECIFICAS PARA ACADEMIAS // 

import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { create } from './create'
import { nearby } from './nearby'
import { search } from './search'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)  //verifica se estao autenticados

  //as rotas criadas abaixo, somente verificados poderão acessar

  app.get('/gyms/search', search)
  app.get('/gyms/nearby', nearby)
  app.post('/gyms', { onRequest: [verifyUserRole('ADMIN')]}, create)
}




