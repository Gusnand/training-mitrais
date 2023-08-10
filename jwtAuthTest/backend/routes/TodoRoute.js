import express from "express";
import { getTodos } from "../controllers/todoController.js";

import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router()

router.get('/todo/:userid', verifyToken, getTodos)

export default router