import { RequestHandler } from 'express'
import { BadRequestError } from '../utils/api-errors'
import * as user from '../models/users'
import { updateUserSchema } from '../schema/user.schema'
import { verifyToken } from '../middleware/authValidate'

export const getAll: RequestHandler = async (req, res) => {
  const data = await user.getAll()

  if (data) return res.json({ data })
  throw new BadRequestError('Erro na busca de usuarios')
}

export const getUser: RequestHandler = async (req, res) => {
  const { id } = req.params
  const data = await user.getOne(parseInt(id))

  if (data) return res.json({ data })
  throw new BadRequestError('Usuario nao encontrado')
}

export const updateUser: RequestHandler = async (req, res) => {
  const body = updateUserSchema.safeParse(req.body)
  if (!body.success) throw new BadRequestError('Dados Invalidos')
  const id = verifyToken(req.headers.authorization)

  const data = await user.update(id, body.data)
  if (!data) throw new BadRequestError('User nao encontrado')

  res.status(202).json({ data })
}

export const getUserTasks: RequestHandler = async (req, res) => {
  const { id } = req.params
  const data = await user.getTasks(parseInt(id))

  if (data) return res.json({ data })
  throw new BadRequestError('Usuario nao encontrado')
}
