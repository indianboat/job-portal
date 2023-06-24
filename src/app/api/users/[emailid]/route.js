import { NextResponse } from "next/server";
import connectDB from "../../../../../middleware/db";
import Candidate from "../../../../../models/candidate";
import Company from "../../../../../models/company";

export const GET = async (req , context) =>{

  const { emailid } = context.params;

  try {
    await connectDB();
      const result = await Candidate.findOne({ email : emailid}) || await Company.findOne({ email : emailid});
      if(!result){
        return new NextResponse("User not found", {status:422});
      }
      else{
        return new NextResponse(JSON.stringify(result), {status:200});
      }
    } 
   catch (error) {
    return NextResponse.json({error:"500 Internal Server Error: " + error}, {status:500});
  }
}

