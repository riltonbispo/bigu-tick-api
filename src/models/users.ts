import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

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
