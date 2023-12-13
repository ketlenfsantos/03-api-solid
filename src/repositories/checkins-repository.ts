import { CheckIn, Prisma } from '@prisma/client'

export interface CheckInsRepository {
  findById(id: string): Promise<CheckIn | null>
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  findManyByUserId(userId: string, page: number): Promise<CheckIn[]>
  countByUserId(userId: string): Promise<number>
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
  save(checkIn: CheckIn): Promise<CheckIn>
  
}

/*export interface CheckInsRepository {
    //metodo para criar o checkin
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
   //procura LISTA de usuário
  findManyByUserId(userId: string, page: number): Promise<CheckIn[]>
  //metodo para ver5 se existe um checkin de um usuário, em determinada data
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
}


*/