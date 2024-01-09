import { TaskCreateType, TaskUpdateType } from '../types/types'
import { prisma } from '../database/client'

export const getAll = async () => {
  try {
    return await prisma.task.findMany()
  } catch (error) {
    return false
  }
}

export const getOne = async (id: number) => {
  try {
    return await prisma.task.findFirst({ where: { id } })
  } catch (error) {
    return false
  }
}

export const add = async (data: TaskCreateType) => {
  try {
    const usersIds = data.users
    const { completed, description, title } = data
    return await prisma.task.create({
      data: {
        completed,
        description,
        title,
        users: {
          connect: usersIds ? usersIds.map((id) => ({ id })) : [],
        },
      },
    })
  } catch (error) {
    return false
  }
}

export const update = async (id: number, data: TaskUpdateType) => {
  try {
    return await prisma.task.update({
      where: { id },
      data,
    })
  } catch (error) {
    return false
  }
}

export const del = async (id: number) => {
  try {
    return await prisma.task.delete({ where: { id } })
  } catch (error) {
    return false
  }
}
