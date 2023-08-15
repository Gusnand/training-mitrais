import express from "express";
import { createTodos, deleteTodos, getTodos, updateTodos } from "../controllers/todoController.js";

import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router()

router.get('/todo/:userid', getTodos)
router.post('/todo/:userid',  createTodos)
router.delete('/todo/:id',  deleteTodos)
router.post('/todo/:userid/:id',  updateTodos)

export default router