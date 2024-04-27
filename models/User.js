import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

// skema model
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Username harus diinput"],
      unique: [true, "Username sudah digunakan"],
    },
    email: {
      type: String,
      required: [true, "email harus diinput"],
      unique: [true, "email sudah digunakan"],
      validate: {
        validator: validator.isEmail,
        message: "inputan harus berformat email",
      },
    },
    password: {
      type: String,
      required: [true, "password harus diinput"],
      minlength: 6, // jumlah karakter yang ada di password
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.virtual("listQuestion", {
  ref: "Question",
  localField: "_id",
  foreignField: "userId",
  justOne: false,
});

// membandingkan password yang diberikan oleh pengguna dengan password yang telah disimpan dalam basis data.
userSchema.methods.comparePassword = async function (reqPassword) {
  return await bcrypt.compare(reqPassword, this.password);
};

// enskripsi datanya supaya aman
userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// response schema
const User = mongoose.model("User", userSchema);
export default User;
