import Answer from "../models/Answer.js";
import Question from "../models/Question.js";
import asyncHandler from "../middleware/asyncHandler.js";

export const addAnswer = asyncHandler(async (req, res) => {
  const questionId = req.params.idQuestion;
  const questionData = await Question.findById(questionId);

  if (!questionData) {
    res.status(404);
    throw new Error("Pertanyaan tidak ditemukan");
  }

  const newAnswer = await Answer.create({
    answer: req.body.answer,
    question: questionId,
    user: req.user._id,
  });
  return res.status(200).json({
    message: "Berhasil buat jawaban",
    data: newAnswer,
  });
});
