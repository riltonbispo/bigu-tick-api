import { RequestHandler } from 'express'
import { UnauthorizedError } from '../utils/api-errors'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

type JwtPayload = {
  id: number
}

export const authValidade: RequestHandler = async (req, res, next) => {
  const { authorization } = req.headers
  if (!authorization) throw new UnauthorizedError('Nao autorizado')

  const token = authorization.split(' ')[1]

  const { id } = jwt.verify(token, process.env.JWT_PASS ?? '') as JwtPayload

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  })
  if (!user) throw new UnauthorizedError('Nao Autorizado')

  next()
}
