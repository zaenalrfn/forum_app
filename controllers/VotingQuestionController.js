import Question from "../models/Question.js";
import VotingQuestion from "../models/VotingQuestion.js";
import asyncHandler from "../middleware/asyncHandler.js";

export const LikeQuestion = asyncHandler(async (req, res) => {
  const questionId = req.params.idQuestion;
  const questionData = await Question.findById(questionId);

  if (!questionData) {
    res.status(404);
    throw new Error("Pertanyaan tidak ditemukan");
  }

  const newVoting = await VotingQuestion.create({
    user: req.user._id,
    question: questionId,
  });

  //   jika berhasil menambah voting
  await Question.findByIdAndUpdate(questionData._id, {
    countVote: questionData.countVote + 1,
  });

  return res.status(200).json({
    message: "Berhasil melakukan Like pertanyaan",
    data: newVoting,
  });
});

export const dislikeQuestion = asyncHandler(async (req, res) => {
  const questionId = req.params.idQuestion;

  await VotingQuestion.findOneAndDelete({
    user: req.user._id,
    question: questionId,
  });

  const questionData = await Question.findById(questionId);

  if (!questionData) {
    res.status(404);
    throw new Error("Pertanyaan tidak ditemukan");
  }
  //   jika berhasil menambah voting
  await Question.findByIdAndUpdate(questionData._id, {
    countVote: questionData.countVote - 1,
  });

  return res.status(200).json({
    message: "Berhasil melakukan dislike pertanyaan",
  });
});
