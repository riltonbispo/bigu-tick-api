import { RequestHandler } from 'express'
import { UnauthorizedError } from '../utils/api-errors'
import { prisma } from '../database/client'
import jwt from 'jsonwebtoken'

export type JwtPayload = {
  id: number
}

export const verifyToken = (
  authorizationHeader: string | undefined,
): number => {
  if (!authorizationHeader) throw new UnauthorizedError('Nao autorizado')
  const token = authorizationHeader.split(' ')[1]
  const { id } = jwt.verify(token, process.env.JWT_PASS ?? '') as JwtPayload

  return id
}

export const authValidade: RequestHandler = async (req, res, next) => {
  if (req.headers.authorization) {
    const userId = verifyToken(req.headers.authorization)

    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (!user) throw new UnauthorizedError('Nao Autorizado')

    next()
  } else {
    throw new UnauthorizedError('Nao autorizado')
  }
}
