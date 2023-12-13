//GERAR BANCO DE DADOS UNICOS PRA CADA SUITE DE TESTE//
import 'dotenv/config'
import { Environment } from 'vitest'
import { randomUUID } from 'node:crypto'
import {execSync} from 'node:child_process'
import { PrismaClient } from '@prisma/client'

//"postgresql://docker:docker@localhost:5432/apisolid?schema=public"//

const prisma = new PrismaClient()

//função para criar outros bancos de dados dentro do que ja temos

function generateDataBaseURL(schema:string){
  if(!process.env.DATABASE_URL) {
    throw new Error ('Please provida a DATABASE_URL environmente variable')
  }
const url = new URL(process.env.DATABASE_URL)

url.searchParams.set('schema', schema)
//vai criar uma nova url, igual aquela acima
return url.toString()


}

export default <Environment>{
  name: 'prisma',
  transformMode: 'ssr',
  async setup() {
  
    const schema = randomUUID()
    const databaseURL = generateDataBaseURL(schema)
    process.env.DATABASE_URL = databaseURL

    //tudo q eu executar aqui é como se tivesse executando no terminal 
    execSync('npx prisma migrate deploy')






    return {
      async teardown() {
        //EXECUTE: para executar coisas no banco (deletar etc)
        //O RAW UYNSAFE PERMITE APAGAR, o q n tem unsafe nao (e mais seguro)
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE` //CASCADE: tudo q foi criado com nosso schema vai ser apagado junto
          )
          //final desconecte do banco de dados
          await prisma.$disconnect

       },
      }
    } ,
  } 
