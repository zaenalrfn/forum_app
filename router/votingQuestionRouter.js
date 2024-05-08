import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { LikeQuestion, dislikeQuestion } from "../controllers/VotingQuestionController.js";

const router = express.Router();

// komponen router turunan atau child

// CRUD

// create document
// post /api/v1/voting/:idQuestion
router.post("/:idQuestion", authMiddleware, LikeQuestion);

// Delete document
// Delete /api/v1/votind/:idQuestion
router.delete("/:idQuestion", authMiddleware, dislikeQuestion);
export default router;
