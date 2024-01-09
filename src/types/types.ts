import { Prisma } from '@prisma/client'
import { prisma } from '../database/client'

export type TaskCreateType = Prisma.Args<typeof prisma.task, 'create'>['data']

export type TaskUpdateType = Prisma.Args<typeof prisma.task, 'update'>['data']
