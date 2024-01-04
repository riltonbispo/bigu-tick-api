import { RequestHandler } from 'express'
import { prismaModel } from '../utils/prismaModel'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { signupSchema, signinSchema } from '../schema/user.schema'
import {
  BadRequestError,
  ConflictError,
  UnauthorizedError,
} from '../utils/api-errors'

export const signup: RequestHandler = async (req, res) => {
  const body = signupSchema.safeParse(req.body)

  if (!body.success) throw new BadRequestError('Dados Invalidos')

  const { email, password, name } = body.data

  const existingUser = await prismaModel.user.findUnique({
    where: {
      email,
    },
  })

  if (existingUser) {
    throw new ConflictError('Email ja cadastrado')
  }

  const passwordHash = await bcrypt.hash(password, 10)

  const newUser = await prismaModel.user.create({
    data: {
      name,
      email,
      password: passwordHash,
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  })

  return res.status(201).json(newUser)
}

export const signin: RequestHandler = async (req, res) => {
  const body = signinSchema.safeParse(req.body)
  if (!body.success) throw new BadRequestError('Dados Invalidos')

  const { email, password } = body.data

  const user = await prismaModel.user.findUnique({
    where: {
      email,
    },
  })
  if (!user) throw new UnauthorizedError('Email Invalido')

  const verifyPassword = await bcrypt.compare(password, user.password)
  if (!verifyPassword) throw new UnauthorizedError('Senha Invalida')

  const token = jwt.sign({ id: user.id }, process.env.JWT_PASS ?? '', {
    expiresIn: '8h',
  })

  res.json({
    user: {
      email: user.email,
      name: user.name,
      id: user.id,
    },
    token,
  })
}
