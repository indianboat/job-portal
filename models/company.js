import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    name: String,
    cname:String,
    email: { type: String, unique: true, required:true },
    mobile: String,
    designation:String,
    password: String,
    role:String,
    active:{ type: Boolean, default:false }
  },
  { timestamps: true }
);


mongoose.models = {};
const Company = mongoose.model("companies", companySchema);

export default Company;
