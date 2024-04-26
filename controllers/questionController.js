import Question from "../models/Question.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { checkPermision } from "../middleware/checkPermision.js";

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
  // const questionsData = await Question.find();

  // ambil semua req query
  const queryObject = { ...req.query };

  // fungsi untuk mengatasi query apa aja yang diabaikan (page dan sort)
  const excludeField = ["page", "sort"];
  excludeField.forEach((element) => delete queryObject[element]);

  // testing console.log
  // console.log(req.query, queryObject);
  let query = Question.find(queryObject);

  // bagian pagination // kenapa dikali satu karena req query bernilai string ketika dikali dengan satu akan menjadi int
  const page = req.query.page * 1 || 1;
  const limitData = 5;
  const skipData = (page - 1) * limitData;

  // menambahkan nilai querynya
  query = query.skip(skipData).limit(limitData);

  // Jika page nya sudah habis / halaman berikutnya sudah tidak ada
  if (req.query.page) {
    const jumlahQuestion = await Question.countDocuments();
    if (skipData >= jumlahQuestion) {
      throw new Error("Halaman ini tidak ada");
    }
  }

  const questionsData = await query;

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

export const updateQuestion = asyncHandler(async (req, res) => {
  const { title, question, kategori } = req.body;

  const paramsId = req.params.id;

  //  mengambil nilai datanya bedasarkan idnya
  const idQuestion = await Question.findById(paramsId);

  // jika id questionnya tidak ditemukan
  if (!idQuestion) {
    res.status(404);
    throw new Error("Pertanyaan id tidak ditemukan");
  }

  // middleware untuk mengecek yang mau edit/delete itu userid yang membuat pertanyaan atau tidak
  checkPermision(req.user, idQuestion.userId, res);

  //  fungsi update
  idQuestion.title = title;
  idQuestion.question = question;
  idQuestion.kategori = kategori;

  // menyimpan nilainya
  await idQuestion.save();

  return res.status(200).json({
    message: "Berhasil update pertanyaan",
    data: idQuestion,
  });
});

export const deleteQuestion = asyncHandler(async (req, res) => {
  const paramsId = req.params.id;

  //  mengambil nilai datanya bedasarkan idnya
  const idQuestion = await Question.findById(paramsId);

  // jika id questionnya tidak ditemukan
  if (!idQuestion) {
    res.status(404);
    throw new Error("Pertanyaan id tidak ditemukan");
  }

  checkPermision(req.user, idQuestion.userId, res);

  // code untuk penghapusan data question
  await Question.findByIdAndDelete(paramsId);
  return res.status(200).json({
    message: "Delete pertanyaan berhasil",
  });
});
