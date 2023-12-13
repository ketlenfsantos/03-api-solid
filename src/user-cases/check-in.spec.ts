import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { expect, describe, it, beforeEach, vi,afterEach } from 'vitest'
import { CheckInUseCase } from '@/user-cases/check-in'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxNumberOfCheckInsError } from './errors/max-number-check-ins-error'
import { MaxDistanceError } from './errors/max-distance-error'


let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check-in Use Case', () => {
  beforeEach( async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)
    
     await gymsRepository.create({
      id:'gym-01',
      title:'JavaScript Gym',
      description:'',
      phone:'',
      latitude: -29.9622614,
      longitude: -51.085312, 

     })

//teste com data fake
    vi.useFakeTimers()
  })
//depois teste com data certa
  afterEach(() => {
    vi.useRealTimers
  })

  it('should be able to check in', async () => {
    //antes de criar o check in:

    vi.setSystemTime(new Date(2022,0,20, 8,0,0))
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude:-29.9622614,
      userLongitude:-51.085312,
    })



    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
//para verficar se foi feito mais de 1 checkin na mesma data
    vi.setSystemTime(new Date(2022,0,20, 8,0,0))
  //testa primeiro checkin//
  await sut.execute({
    gymId:'gym-01',
    userId:'user-01',
    userLatitude:-29.9622614,
      userLongitude:-51.085312,
  })

  //se fez checkin no mesmo dia, quero q rejeite e de erro
    await expect(()  => sut.execute({
      gymId:'gym-01',
    userId:'user-01',
    userLatitude:-29.9622614,
      userLongitude:-51.085312,
    })).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)

})

//pode fazer checkin, so q em diferentes dias

it('should not be able to check in twice in different days', async () => {
  //para verficar se foi feito mais de 1 checkin na mesma data
      vi.setSystemTime(new Date(2022,0,20, 8,0,0))
    //testa primeiro checkin//
    await sut.execute({
      gymId:'gym-01',
      userId:'user-01',
      userLatitude: -29.9622614,
      userLongitude:-51.085312,
    })

    
    vi.setSystemTime(new Date(2022,0,21, 8,0,0))

   const { checkIn } = await sut.execute({
    gymId:'gym-01',
    userId:'user-01',
    userLatitude:-29.9622614,
      userLongitude:-51.085312,
   })

   expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distant gym', async () => {
    gymsRepository.items.push({
      id: 'gym-02',
      title: 'JavaScript Gym',
      description: '',
      phone: '',
      latitude: new Decimal(-27.0747279),
      longitude: new Decimal(-49.4889672),
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-02',
        userId: 'user-01',
        userLatitude: -27.2092052,
        userLongitude: -49.6401091,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})