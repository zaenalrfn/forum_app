import mongoose, { Schema } from "mongoose";

// skema model database
const answerSchema = new mongoose.Schema(
  {
    answer: {
      type: String,
      required: [true, "Jawaban harus diinput"],
    },
    question: {
      type: Schema.Types.ObjectId,
      ref: "Question",
      required: [true, "Target pertanyaan harus terisi"],
    },
    //   Tabel Relasinya userId dari Model user.js
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "UserId harus terisi"],
    },
    countVote: {
      type: Number,
      default: 0,
    },
  },
  {
    // waktu pembuatan nya
    timestamps: true,
  }
);

// response schema
const Answer = mongoose.model("Answer", answerSchema);
export default Answer;
