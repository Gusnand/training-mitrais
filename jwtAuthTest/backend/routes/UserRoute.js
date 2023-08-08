import express from 'express'
import { DeleteAcc, LoginUser, Regist, getUsers } from '../controllers/UserController.js'

const router = express.Router()

router.get('/users', getUsers)
router.post('/users', Regist)
router.delete('/users/:id', DeleteAcc)
router.post('/login', LoginUser)


export default router