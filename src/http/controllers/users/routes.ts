//ROTAS PARA OS USUÁRIOS

import { FastifyInstance } from "fastify";
import { register } from "../register";
import { authenticate } from "./authenticate"
import { verifyJWT } from "../../middlewares/verify-jwt";
import { profile } from "./profile";
import { refresh } from "./refresh";

//plugin do fastify, precisa ser uma função
export async function usersRoutes(app: FastifyInstance) {
    //rotas q nao precisam de autenticação
    //criação da rota - app. o que vai ser feito + colocar 'o que ta sendo feito' e o documento que ta
    app.post('/users', register)

    //criando uma sessão de autenticação.
    app.post('/sessions', authenticate)

    //pega um token e atualizar
    app.patch('/token/refresh' , refresh)

    //rotas que só poderão ser chamadas assim q usuário estiver AUTENTICADO
    // usuário so vai conseguir retornar os dados do perfil se ja tiver feito
    // login perviamente  //rota chama o controler "profile"
    app.get('/me', { onRequest: [verifyJWT]},profile)

}




