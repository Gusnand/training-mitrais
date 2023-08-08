import express from 'express'
import { Regist, getUsers } from '../controllers/UserController.js'

const router = express.Router()

router.get('/users', getUsers)
router.post('/users', Regist)


export default router