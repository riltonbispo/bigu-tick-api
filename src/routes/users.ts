import { Router } from 'express'
import * as user from '../controllers/users'
import { authValidade } from '../middleware/authValidate'

const router = Router()

router.use(authValidade)
router.get('/', user.getAll)
router.get('/:id', user.getUser)
router.put('/', user.updateUser)
router.get('/:id/tasks', user.getUserTasks)

export default router
