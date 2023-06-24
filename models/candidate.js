import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    mobile: String,
    password: String,
    role:String,
    active:{ type: Boolean, default:false}
  },
  { timestamps: true }
);


mongoose.models = {};
const Candidate = mongoose.model("candidates", candidateSchema);

export default Candidate;
