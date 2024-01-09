import { Prisma } from '@prisma/client'
import { prisma } from '../database/client'
import { createTaskSchema } from '../schema/task.schema'
import { z } from 'zod'

export type TaskCreateType = z.infer<typeof createTaskSchema>

export type TaskUpdateType = Prisma.Args<typeof prisma.task, 'update'>['data']
