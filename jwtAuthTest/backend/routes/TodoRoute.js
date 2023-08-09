import express from "express";
import { getTodos } from "../controllers/todoController.js";

const router = express.Router()

router.get('/todo/:userid', getTodos)

export default router