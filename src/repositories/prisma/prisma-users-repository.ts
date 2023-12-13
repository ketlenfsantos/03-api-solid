//documento criado para criar portas de entradas para o banco de dados 


import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

import { UsersRepository } from '@/repositories/user-repository'
export class PrismaUsersRepository implements UsersRepository {
  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    return user
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }
}

/*import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client"
import { UsersRepository } from "../user-repository";


//a classe Prisma User => aqui dentro havera varios metodos que serao portas de entrada para QUALQUER opção no banco de Dados
//implemento o userrepository para usa-lo
export class PrismaUsersRepository implements UsersRepository {
    async findByEmail(email: string) {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      })
  
      return user
    }
  
    async create(data: Prisma.UserCreateInput) {
      const user = await prisma.user.create({
        data,
      })
  
      return user
    }
  }
        
 


/*
A API (Interface de Programação de Aplicativo) do SOLIDWORKS é uma interface de programação COM 
para o SOLIDWORKS. Funções na API fornecem aos programadores acesso direto à funcionalidade do SOLIDWORKS.
*/