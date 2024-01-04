import { RequestHandler } from 'express'
import * as tasks from '../models/tasks'
import { BadRequestError } from '../utils/api-errors'
import { createTaskSchema, updateTaskSchema } from '../schema/task.schema'

export const getAll: RequestHandler = async (req, res) => {
  const result = await tasks.getAll()

  if (!result) throw new BadRequestError('Erro ao buscar tasks')

  res.json({ tasks: result })
}

export const getTask: RequestHandler = async (req, res) => {
  const { id } = req.params
  const result = await tasks.getOne(parseInt(id))

  if (!result) throw new BadRequestError('Taks nao encontrada')

  return res.json({ tasks: result })
}

export const addTask: RequestHandler = async (req, res) => {
  const body = createTaskSchema.safeParse(req.body)
  if (!body.success) throw new BadRequestError('Dados Invalidos')

  const result = await tasks.add(body.data)
  if (!result) throw new BadRequestError('Erro ao criar tasks')

  res.status(201).json({ task: result })
}

export const updateTask: RequestHandler = async (req, res) => {
  const body = updateTaskSchema.safeParse(req.body)
  const { id } = req.params
  if (!body.success) throw new BadRequestError('Dados Invalidos')

  const result = await tasks.update(parseInt(id), body.data)
  if (!result) throw new BadRequestError('Taks nao encontrada')

  res.status(202).json({ task: result })
}

export const deleteTask: RequestHandler = async (req, res) => {
  const { id } = req.params

  const result = await tasks.del(parseInt(id))
  if (!result) throw new BadRequestError('Taks nao encontrada')

  res.json({ tasks: result })
}
