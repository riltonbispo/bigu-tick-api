import { Router } from 'express'
import * as auth from '../controllers/auth'
import { authValidade } from '../middleware/authValidate'

const router = Router()

router.post('/signup', auth.signup)
router.post('/signin', auth.signin)

router.use(authValidade)
router.get('/ping', async (req, res) => {
  res.json({ pong: true })
})

export default router
