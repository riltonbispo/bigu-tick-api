import { prisma } from '../database/client'

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

export const getTasks = async (id: number) => {
  try {
    const tasks = await prisma.taskAssignment.findMany({
      where: {
        user_id: id,
      },
      include: {
        task: true,
      },
    })

    const result = tasks.map((assignment) => assignment.task)

    return result || []
  } catch (error) {
    return false
  }
}
