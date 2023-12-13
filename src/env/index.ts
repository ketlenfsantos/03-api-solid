
import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  JWT_SECRET: z.string(),
  PORT: z.coerce.number().default(3333),
})

const _env = envSchema.safeParse(process.env)
if (_env.success === false) {
  console.error('❌ Invalid environment variables', _env.error.format())

  throw new Error('Invalid environment variables.')
}


export const env = _env.data









/*ARQUIVO CRIADO PARA IMPORTAR E VALIDAR AS VARIÁVEIS DE AMBIENTE //

import 'dotenv/config'
import { z } from 'zod'
/*const envSchema = z.object({
 //validar variavel NODE_ENV - zod solicita que seja uma dentre as opções (enum) - caso a variavel n seja informada (valor default automatico)
     NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
     //SENHAS DO TOKEN
     JWT_SECRET: z.string(),
//validar variavelporta,hospedagem que decide - z.coerce (pega algum dado independente do formato e converte pro formato após ele) - dafault se n der sera 3333
    PORT: z.coerce.number().default(3333), 
})

//validação schema, safe parse valida o process.env para ver se tem as informações acima. 
const _env = envSchema.safeParse(process.env)

//verificar se a validação acima deu certo ou não

if (_env.success == false) {
    console.error('Invalid enviroment variables', _env.error.format())
    throw new Error('Invalid enviroment variables.')
}

//caso der certo a validação:

export const env = _env.data*/