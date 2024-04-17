import express from "express";
import { authMiddleware, permisionUser } from "../middleware/authMiddleware.js";
import { CreateQuestion, QuestionAll, detailQuestion, updateQuestion, deleteQuestion } from "../controllers/questionController.js";
const router = express.Router();

// komponen router turunan atau child

// CRUD

// create document
// post /api/v1/auth/question
router.post("/", authMiddleware, CreateQuestion);

// read document
// get /api/v1/auth/question
router.get("/", QuestionAll);
// get /api/v1/auth/question/:id
router.get("/:id", detailQuestion);

// update document
// put /api/v1/auth/question
router.put("/:id", authMiddleware, updateQuestion);

// delete question
// get /api/v1/auth/question/:id
router.delete("/:id", deleteQuestion);

export default router;
