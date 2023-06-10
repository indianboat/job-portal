import { NextResponse } from "next/server";
import connectDB from "../../../../middleware/db";
import User from "../../../../models/user";
import argon2i from "argon2";

export const POST = async (req) => {
  const { name, email, mobile, password } = await req.json();

  try {
    await connectDB();
    const userExist = await User.findOne({ email });

    if (userExist) {
      // return new NextResponse({message:"User already exists !"}, { status: 422 });
      return NextResponse.json({ message: 'User already exists !' }, { status: 500, statusText:"User already exists !" })
    } else {
      const passHash = await argon2i.hash(password);
      const result = new User({ name, email, mobile, password: passHash });
      const data = await result.save();

      if (data) {
        return NextResponse.json({ message: 'Sign up Success' },{ status: 201, statusText:"Sign up Success"});
      } else {
        return new NextResponse.json({ message: 'Internal Server Error' }, { status: 422, statusText:"Internal Server Error" });
      }
    }

  } catch (error) {
    return new NextResponse.json({ message: 'Internal Server Error '+error }, { status: 500, statusText:"Internal Server Error" });
  }
};
