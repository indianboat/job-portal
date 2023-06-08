import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    mobile: String,
    password: String,  
  },
  { timestamps: true }
);


mongoose.models = {};
const User = mongoose.model("user", userSchema);

export default User;
