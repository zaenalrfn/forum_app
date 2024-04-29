import mongoose, { Schema } from "mongoose";

// skema model database
const questionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Judul harus diinput"],
      unique: [true, "Judul sudah pernah dibuat"],
    },
    question: {
      type: String,
      required: [true, "Pertanyaan harus diinput"],
    },
    kategori: {
      type: String,
      enum: ["javascript", "database", "bakcend", "expressjs", "vuejs"],
      required: [true, "Pertanyaan harus memiliki kategori"],
    },
    //   Tabel Relasinya userId dari Model user.js
    userId: {
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
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

questionSchema.virtual("listAnswer", {
  ref: "Answer",
  localField: "_id",
  foreignField: "question",
  justOne: false,
});

// response schema
const Question = mongoose.model("Question", questionSchema);
export default Question;
