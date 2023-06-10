import { NextResponse } from "next/server";
import connectDB from "../../../../middleware/db";
import User from "../../../../models/user";

export const GET = async (request) =>{
  try {
    await connectDB();
      const result = await User.find({});
      return new NextResponse(JSON.stringify(result), {status:200});
    } 
   catch (error) {
    return new NextResponse("500 Server Error"+error, {status:500});
  }
}

