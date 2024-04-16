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

export const QuestionAll = asyncHandler(async (req, res) => {
  // menampung semua nilai dari questionnya
  // fungsi find() untuk menampilkan semua document / data
  const questionsData = await Question.find();

  res.status(200).json({
    message: "Data pertanyaan berhasil di tampilkan semua",
    data: questionsData,
  });
});

export const detailQuestion = asyncHandler(async (req, res) => {
  const paramsId = req.params.id;
  // mencari detail question bedasarkan idnya
  const DetailQuestion = await Question.findById(paramsId);

  // kondisi jika detail question atau id question tidak ada
  if (!DetailQuestion) {
    return res.status(404).json({
      message: "Id pertanyaan tidak ditemukan",
    });
  }
  // jika detail question atau id question ada
  return res.status(200).json({
    message: "Document Id pertanyaan berhasil ditampilkan",
    data: DetailQuestion,
  });
});
export const updateQuestion = (req, res) => {
  res.send("Update pertanyaan");
};
export const deleteQuestion = (req, res) => {
  res.send("Delete pertanyaan");
};
