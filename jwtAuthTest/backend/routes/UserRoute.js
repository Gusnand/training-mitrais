import express from 'express'
import { DeleteAcc, LoginUser, LogoutUser, Regist, getUsers } from '../controllers/UserController.js'
import { verifyRefreshToken } from '../middleware/verifyRefreshToken.js'
import { refreshToken } from '../controllers/RefreshToken.js'

const router = express.Router()

router.get('/users', getUsers)
router.post('/users', Regist)
router.delete('/users/:id', DeleteAcc)
router.post('/login', LoginUser)
router.post('/logout', LogoutUser)
router.get('/token', verifyRefreshToken, refreshToken)
// router.get('/token', )

export default router