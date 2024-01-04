import { prismaModel } from '../utils/prismaModel'

export const getAll = async () => {
  try {
    return await prismaModel.user.findMany({
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
    return await prismaModel.user.findFirst({
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
