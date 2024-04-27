import User from "../models/User.js";
import Jwt from "jsonwebtoken";
import asyncHandler from "../middleware/asyncHandler.js";
// untuk membuat fungsi dibelakang layar atau bisnis logicnya

// membuat exxpried / berapa lama token itu aktif
// kalau tokennya udah habis akan logout otomatis
const signToken = (id) => {
  return Jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "6d",
  });
};

// membuat token
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user.id);
  const cookieOption = {
    expire: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    security: false,
  };
  res.cookie("jwt", token, cookieOption);
  //   supaya password tidak tampil di frontend
  user.password = undefined;
  res.status(statusCode).json({
    data: user,
  });
};

export const RegisterUser = asyncHandler(async (req, res) => {
  // mengecek user ada valuenya tidak atau kosong
  // countDocuments = untuk menghitung berapa banyak document di database
  const isFirstAccount = (await User.countDocuments()) === 0;
  // jika document masih kosong rolenya diset jadi admin
  const role = isFirstAccount ? "admin" : "user";
  const createUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role,
  });
  createSendToken(createUser, 201, res);
});

export const LoginUser = asyncHandler(async (req, res) => {
  //   jika req email dan password tidak di isi atau kosong
  if (!req.body.email && !req.body.password) {
    // akan menampilkan
    res.status(400);
    throw new Error("Inputan email dan password tidak boleh kosong");
  }

  //   jika email yang diinput sudah terdaftar di database atau tidak
  const userData = await User.findOne({
    email: req.body.email,
  });
  if (userData && (await userData.comparePassword(req.body.password))) {
    // akan menjalankan fungsi
    createSendToken(userData, 200, res);
  } else {
    res.status(400);
    throw new Error("Invalid User");
  }
});

export const LogoutUser = (req, res) => {
  // akan menghapus cookie nya / menghapus value cookienya
  res.cookie("jwt", "", {
    expire: new Date(0),
    httpOnly: true,
    security: false,
  });
  res.status(200).json({
    message: "Logout Berhasil",
  });
};

export const getUser = async (req, res) => {
  // ambil user yang sudah login
  // password: 0 = tidak menampilkan passwordnya selain itu akan ditampilkan
  const user = await User.findById(req.user.id).select({ password: 0 }).populate("listQuestion");
  if (user) {
    return res.status(200).json({
      user,
    });
  }
  return res.status(401).json({
    message: "User tidak di temukan",
  });
};
