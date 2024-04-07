import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./router/authRouter.js";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { errorHandler, notFound } from "./middleware/errorHandler.js";

dotenv.config();

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // supaya di dalam postman bisa mengaktifkan fungsi dari url encode untuk merequest bodynya
app.use(cookieParser());
// untuk mengecek status endpoint di terminal
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// entpoint
app.get("/", (req, res) => {
  res.status(200).json({
    mesagge: "Pesan dari entpoint express",
  });
});

// router utama / router parent
app.use("/api/v1/auth", authRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// koneksi database mongodb
mongoose.connect(process.env.DATABASE, {}).then(() => {
  console.log("database berhasil konek");
});
