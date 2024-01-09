import { RequestHandler } from 'express'
import { BadRequestError } from '../utils/api-errors'
import * as user from '../models/users'

export const getAll: RequestHandler = async (req, res) => {
  const result = await user.getAll()

  if (result) return res.json({ users: result })
  throw new BadRequestError('Erro na busca de usuarios')
}

export const getUser: RequestHandler = async (req, res) => {
  const { id } = req.params
  const result = await user.getOne(parseInt(id))

  if (result) return res.json({ user: result })
  throw new BadRequestError('Usuario nao encontrado')
}

export const getUserTasks: RequestHandler = async (req, res) => {
  const { id } = req.params
  const result = await user.getTasks(parseInt(id))

  if (result) return res.json({ tasks: result })
  throw new BadRequestError('Usuario nao encontrado')
}
