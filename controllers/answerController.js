import Answer from "../models/Answer.js";
import Question from "../models/Question.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { checkPermision } from "../middleware/checkPermision.js";

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

export const deleteAnswer = asyncHandler(async (req, res) => {
  const paramsId = req.params.id;

  const answerData = await Answer.findById(paramsId);

  // jika user sudah benar apakah user tersebut yang membuat jawaban
  checkPermision(req.user, answerData.user, res);
  await Answer.findByIdAndDelete(paramsId);

  return res.status(200).json({
    message: "Berhasil hapus jawaban",
  });
});
