import express from 'express'
import { DeleteAcc, LoginUser, LogoutUser, Regist, getUsers } from '../controllers/UserController.js'

const router = express.Router()

router.get('/users', getUsers)
router.post('/users', Regist)
router.delete('/users/:id', DeleteAcc)
router.post('/login', LoginUser)
router.post('/logout', LogoutUser)
// router.get('/token', )

export default router