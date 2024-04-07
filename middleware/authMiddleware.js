import jwt from "jsonwebtoken";
import User from "../models/User.js";
// jika user belum melakukan login maka belum bisa akses rute nya, tapi jika sudah login maka bisa akses rutenua
// memgamankan route dengan middleware

// menerima token dari user yang login
export const authMiddleware = async (req, res, next) => {
  // mengambil tokennya
  let token;
  token = req.cookies.jwt;
  if (!token) {
    return next(
      res.status(401).json({
        message: "Anda tidak boleh mengakses halaman ini",
      })
    );
  }

  // untuk menampung data id yang dimaksukkan di jwt
  let decoded;
  try {
    // jika dapat jwt token akan di verivikasi dan akan dapat id usernya
    decoded = await jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return next(
      res.status(401).json({
        message: "Token yang dimasukkan salah/tidak ada",
      })
    );
  }

  const currentUSer = await User.findById(decoded.id);
  //  jika usernya tidak ada/kosong/terhapus tapi tokennya masih ada
  if (!currentUSer) {
    return next(
      res.status(401).json({
        message: "User tidak di temukan/terhapus",
      })
    );
  }
  // user itu bawaan dari express
  // dan ini untuk menampung usernya yang login nanti
  // menerima token dari user yang login
  req.user = currentUSer;

  next();
};

// fungsi untuk mengatur role
// akan mengecek role yang bisa mengakses entpoint entpoint tertentu

// permisionUser menggunakan rest parameter supaya bisa menampung beberapa parameter
export const permisionUser = (...roles) => {
  return (req, res, next) => {
    // yang bisa mengakses entpoint tertentu yaitu ['admin']
    if (!roles.includes(req.user.role)) {
      // jika tidak berhasil
      return next(
        res.status(403).json({
          message: "role anda tidak bisa mengakses halaman ini",
        })
      );
    }
    // jika berhasil
    next();
  };
};
