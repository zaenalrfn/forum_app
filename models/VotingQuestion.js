import mongoose, { Schema } from "mongoose";

// skema model database
const votingQuestionSchema = new mongoose.Schema({
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
});

// fungsi supaya user tidak bisa like 2 kali
votingQuestionSchema.index(
  {
    question: 1,
    user: 1,
  },
  {
    unique: true,
  }
);

// response schema
const VotingQuestion = mongoose.model("VotingQuestion", votingQuestionSchema);
export default VotingQuestion;
