import Question from "../models/Question.js";
import asyncHandler from "../middleware/asyncHandler.js";

export const CreateQuestion = asyncHandler(async (req, res) => {
  const { title, question, kategori } = req.body;

  const newQuestion = await Question.create({
    // kebetulan namanya sama dengan req.body jadi bisa disederhanakan seperti ini
    title,
    question,
    kategori,
    userId: req.user._id, // kalau mongodb idnya jadi _id
  });
  return res.status(200).json({
    message: "Berhasil tambah pertanyaan",
    data: newQuestion,
  });
});

export const QuestionAll = (req, res) => {
  res.send("Tampil semua pertanyaan");
};
export const detailQuestion = (req, res) => {
  res.send("Detail pertanyaan");
};
export const updateQuestion = (req, res) => {
  res.send("Update pertanyaan");
};
export const deleteQuestion = (req, res) => {
  res.send("Delete pertanyaan");
};
