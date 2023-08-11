import express from "express";
import { createTodos, deleteTodos, getTodos, updateTodos } from "../controllers/todoController.js";

import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router()

router.get('/todo/:userid', verifyToken, getTodos)
router.post('/todo/:userid', verifyToken, createTodos)
router.delete('/todo/:id', verifyToken, deleteTodos)
router.post('/todo/:userid/:id', verifyToken, updateTodos)

export default router