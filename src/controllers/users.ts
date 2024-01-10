import { RequestHandler } from 'express'
import { BadRequestError } from '../utils/api-errors'
import * as user from '../models/users'
import { updateUserSchema } from '../schema/user.schema'
import { verifyToken } from '../middleware/authValidate'

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

export const updateUser: RequestHandler = async (req, res) => {
  const body = updateUserSchema.safeParse(req.body)
  if (!body.success) throw new BadRequestError('Dados Invalidos')
  const id = verifyToken(req.headers.authorization)

  const result = await user.update(id, body.data)
  if (!result) throw new BadRequestError('User nao encontrado')

  res.status(202).json({ user: result })
}

export const getUserTasks: RequestHandler = async (req, res) => {
  const { id } = req.params
  const result = await user.getTasks(parseInt(id))

  if (result) return res.json({ result })
  throw new BadRequestError('Usuario nao encontrado')
}
