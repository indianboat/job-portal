import { NextResponse } from "next/server";
import connectDB from "../../../../../middleware/db";
import Company from "../../../../../models/company";
import argon2i from "argon2";

export const POST = async (req) => {
  const { name, email, mobile, password, role, cname, designation } = await req.json();

  try {
    await connectDB();
    const userExist = await Company.findOne({ email });

    if (userExist) {
      return NextResponse.json({ error: 'User already exists !' }, { status: 422 });
    } else {
      const passHash = await argon2i.hash(password);
      const result = new Company({ name, email, mobile, password: passHash, role, cname, designation });
      const data = await result.save();

      if (data) {
        return new NextResponse('Sign up Success',{ status: 201});
      } else {
        return new NextResponse('Internal Server Error', { status: 500 });
      }
    }

  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error: '+ error }, { status: 500 })
  }
};
