import { Prisma } from '@prisma/client'
import { prismaModel } from '../utils/prismaModel'

export type TaskCreateType = Prisma.Args<
  typeof prismaModel.task,
  'create'
>['data']

export type TaskUpdateType = Prisma.Args<
  typeof prismaModel.task,
  'update'
>['data']
