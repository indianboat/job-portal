"use client";

import React from 'react';
import { useFormik } from 'formik';
import Link from 'next/link';

const Signup = () => {

  const formik = useFormik({
    initialValues:{
      name:"",
      email:"",
      mobile:"",
      password:""
    },
    onSubmit,
  })

  async function onSubmit(values){
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const data = await res.json();

    if (data.message == "User already exists !") {
      alert("User already exists !");
    } else if ( data.message == "Sign up Success") {
      alert("Sign up Success");
      formik.resetForm({values:""})
    } else if (data.message == "Server Error, try again later") {
      alert("Server Error, try again later");
    } else if (data.message) {
      alert(data.message);
    }
  }

  return (
    <>
     <div className="flex p-8">
     <form onSubmit={formik.handleSubmit} className='flex flex-col'>
      <Link href={"/"}>Home</Link>
        <input required className='border px-4 py-1' type="text" name='name' {...formik.getFieldProps("name")} placeholder='Enter your name' />
        <input required className='border px-4 py-1' type="email" name='email'{...formik.getFieldProps("email")} placeholder='Enter your email address' />
        <input required maxLength={10} className='border px-4 py-1' type="tel" name='mobile' {...formik.getFieldProps("mobile")} placeholder='Enter your mobile' />
        <input required className='border px-4 py-1' type="password" name='password' {...formik.getFieldProps("password")} placeholder='create password' />
        <button type="submit" className='border bg-slate-300 px-4 py-1 text-center'>sign up</button>
        Have an account?<Link href={"/login"} className="border px-4 py-1 text-center mt-4">Login</Link>
      </form>
      
     </div>
    </>
  )
}

export default Signup