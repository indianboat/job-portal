import { NextResponse } from "next/server";
import connectDB from "../../../../middleware/db";
import Job from "../../../../models/jobs";

export const POST = async (req) => {
  const data = await req.json();

  try {
    await connectDB();
    
    const result = new Job(data);
    const job = await result.save();

    if (job) {
       return new NextResponse('Sign up Success',{ status: 201});
    } else {
      return new NextResponse('Internal Server Error', { status: 500 });
    }
  
  } 
  catch (error) {
    return NextResponse.json({ error: 'Internal Server Error: '+ error }, { status: 500 })
  }
};
