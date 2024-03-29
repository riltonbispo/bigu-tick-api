import { prisma } from '../database/client'
import { UserUpdateType } from '../types/types'

export const getAll = async () => {
  try {
    return await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
      },
    })
  } catch (error) {
    return false
  }
}

export const getOne = async (id: number) => {
  try {
    return await prisma.user.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        email: true,
        name: true,
      },
    })
  } catch (error) {
    return false
  }
}

export const update = async (id: number, data: UserUpdateType) => {
  try {
    return await prisma.user.update({
      where: {
        id,
      },
      select: {
        email: true,
        name: true,
      },
      data,
    })
  } catch (error) {
    return false
  }
}

export const getTasks = async (id: number) => {
  try {
    const result = await prisma.user.findFirst({
      where: {
        id,
      },
      select: {
        tasks: true,
      },
    })

    return result || []
  } catch (error) {
    return false
  }
}
