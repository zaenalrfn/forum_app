import express from "express";
import { RegisterUser, LoginUser, LogoutUser, getUser } from "../controllers/authController.js";
import { authMiddleware, permisionUser } from "../middleware/authMiddleware.js";

const router = express.Router();

// komponen router turunan atau child

// post /api/v1/auth/register
router.post("/register", RegisterUser);

// post /api/v1/auth/login
router.post("/login", LoginUser);

// get /api/v1/auth/logout
router.get("/logout", LogoutUser);

// get /api/v1/auth/getUser
// authMiddleware = akan mengecek dulu datanya apakah sesuai kalau sesuai akan lanjut mengeksekusi getUser
router.get("/getUser", authMiddleware, getUser);

// get /api/v1/auth/test
router.get("/test", authMiddleware, permisionUser("admin"), (req, res) => {
  res.send("berhasil");
});

export default router;
