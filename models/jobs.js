import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    jobId:String,
    company_name:{ type:String, required:true },
    job_title:{ type:String, required:true },
    job_location:{ type:String, required:true },
    job_link:{ type:String, required:true },
    skills_required:{ type:String, required:true },
    office_type:String,
    salary_start: Number,
    salary_end: Number,
    year_of_experience:Number,
    company_logo_link:String,
    start_date:String,
    job_vacancy:Number,
    job_description:String,
    benifits:[{ type:String }],
    accountEmail:String
  },
  { timestamps: true }
);

mongoose.models = {};
const Job = mongoose.model("jobs", jobSchema);

export default Job;
