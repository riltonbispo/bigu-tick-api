import { TaskCreateType, TaskUpdateType } from '../types/types'
import { prismaModel } from '../utils/prismaModel'

export const getAll = async () => {
  try {
    return await prismaModel.task.findMany()
  } catch (error) {
    return false
  }
}

export const getOne = async (id: number) => {
  try {
    return await prismaModel.task.findFirst({ where: { id } })
  } catch (error) {
    return false
  }
}

export const add = async (data: TaskCreateType) => {
  try {
    return await prismaModel.task.create({ data })
  } catch (error) {
    return false
  }
}

export const update = async (id: number, data: TaskUpdateType) => {
  try {
    return await prismaModel.task.update({
      where: { id },
      data,
    })
  } catch (error) {
    return false
  }
}

export const del = async (id: number) => {
  try {
    return await prismaModel.task.delete({ where: { id } })
  } catch (error) {
    return false
  }
}
