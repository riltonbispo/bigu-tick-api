import { Router } from 'express'
import { authValidade } from '../middleware/authValidate'
import * as tasks from '../controllers/tasks'

const router = Router()

router.use(authValidade)
router.get('/', tasks.getAll)
router.get('/:id', tasks.getTask)
router.post('/', tasks.addTask)
router.put('/:id', tasks.updateTask)
router.delete('/:id', tasks.deleteTask)

export default router
