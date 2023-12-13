import { CheckInsRepository } from '@/repositories/checkins-repository'
import { ResourceNotFoundError } from '@/user-cases/errors/resource-not-found-error'
import { CheckIn } from '@prisma/client'
import dayjs from 'dayjs'

interface ValidateCheckInUseCaseRequest {
  checkInId: string
}

interface ValidateCheckInUseCaseResponse {
  checkIn: CheckIn
}

export class ValidateCheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    checkInId,
  }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourceNotFoundError()
    }

    //distancia em minutos desde a criação do checkin / meotdo diff retorna a diferneça entre as duas datas. 
    const distanceInMinutesFromCheckInCreation = dayjs(new Date ()).diff(
      checkIn.created_at, 
      'minutes'
    )

    if(distanceInMinutesFromCheckInCreation > 20) {
      throw new Error
    }

    checkIn.valided_at = new Date()

    await this.checkInsRepository.save(checkIn)

    return {
      checkIn,
    }
  }
}