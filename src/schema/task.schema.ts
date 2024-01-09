import { z } from 'zod'

export const createTaskSchema = z.object({
  title: z
    .string()
    .min(3, { message: 'Minimo 3 digitos para o titulo' })
    .max(20, { message: 'Maximo 20 digitos para o titulo' }),
  description: z.string(),
  completed: z.boolean(),
  users: z.number().array().optional(),
})

export const updateTaskSchema = z.object({
  title: z
    .string()
    .min(3, { message: 'Minimo 3 digitos para o titulo' })
    .max(20, { message: 'Maximo 20 digitos para o titulo' })
    .optional(),
  description: z.string().optional(),
  completed: z.boolean().optional(),
})
