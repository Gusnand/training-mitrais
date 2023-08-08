import express from 'express'
import { DeleteAcc, Regist, getUsers } from '../controllers/UserController.js'

const router = express.Router()

router.get('/users', getUsers)
router.post('/users', Regist)
router.delete('/users/:id', DeleteAcc)


export default router