// ROTAS ESPECIFICAS PARA CHECKINS // 

import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { create } from './create'
import { validate } from './validate'
import { metrics } from './metric'
import { history } from './history'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)  //verifica se estao autenticados

  //as rotas criadas abaixo, somente verificados poderão acessar

  app.get('/check-ins/history', history)
  app.get('/check-ins/metrics', metrics)

  app.post('/gyms/:gymId/check-ins', create)
  app.patch('/check-ins/:checkInId/validate', {onRequest: [verifyUserRole('ADMIN')]},  validate)
}


