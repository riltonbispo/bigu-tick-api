import { createTaskSchema, updateTaskSchema } from '../schema/task.schema'
import { z } from 'zod'
import { updateUserSchema } from '../schema/user.schema'

export type TaskCreateType = z.infer<typeof createTaskSchema>

export type TaskUpdateType = z.infer<typeof updateTaskSchema>

export type UserUpdateType = z.infer<typeof updateUserSchema>
