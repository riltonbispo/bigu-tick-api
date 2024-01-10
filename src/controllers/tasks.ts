import { RequestHandler } from 'express'
import * as tasks from '../models/tasks'
import { BadRequestError } from '../utils/api-errors'
import { createTaskSchema, updateTaskSchema } from '../schema/task.schema'

export const getAll: RequestHandler = async (req, res) => {
  const data = await tasks.getAll()

  if (!data) throw new BadRequestError('Erro ao buscar tasks')

  res.json({ data })
}

export const getTask: RequestHandler = async (req, res) => {
  const { id } = req.params
  const data = await tasks.getOne(parseInt(id))

  if (!data) throw new BadRequestError('Taks nao encontrada')

  return res.json({ data })
}

export const addTask: RequestHandler = async (req, res) => {
  const body = createTaskSchema.safeParse(req.body)
  if (!body.success) throw new BadRequestError('Dados Invalidos')

  const data = await tasks.add(body.data)
  if (!data) throw new BadRequestError('Erro ao criar tasks')

  res.status(201).json({ data })
}

export const updateTask: RequestHandler = async (req, res) => {
  const body = updateTaskSchema.safeParse(req.body)
  const { id } = req.params
  if (!body.success) throw new BadRequestError('Dados Invalidos')

  const data = await tasks.update(parseInt(id), body.data)
  if (!data) throw new BadRequestError('Taks nao encontrada')

  res.status(202).json({ data })
}

export const deleteTask: RequestHandler = async (req, res) => {
  const { id } = req.params

  const data = await tasks.del(parseInt(id))
  if (!data) throw new BadRequestError('Taks nao encontrada')

  res.json({ data })
}
