import { Router } from 'express'
import * as user from '../controllers/users'
import { authValidade } from '../middleware/authValidate'

const router = Router()

router.use(authValidade)
router.get('/', user.getAll)
router.get('/:id', user.getUser)
router.get('/:id/tasks', user.getUserTasks)

export default router
