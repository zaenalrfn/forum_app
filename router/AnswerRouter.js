import express from "express";
import { authMiddleware, permisionUser } from "../middleware/authMiddleware.js";
import { addAnswer } from "../controllers/answerController.js";

const router = express.Router();

// komponen router turunan atau child

// CRUD

// create document
// post /api/v1/answer
router.post("/:idQuestion", authMiddleware, addAnswer);

export default router;
