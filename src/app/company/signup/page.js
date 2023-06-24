"use client";

import React from 'react';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

const CompanySignup = () => {

  const router = useRouter();

  const formik = useFormik({
    initialValues:{
      name:"",
      email:"",
      cname:"",
      designation:"",
      mobile:"",
      password:"",
      role:"organization"
    },
    onSubmit,
  })

  async function onSubmit(values){
    const res = await fetch("/api/signup/company", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (res.status == 422) {
      toast("User already exists !");
    } 
    
    else if ( res.status == 201) {
      toast("Sign up Success, redirecting...");
      setTimeout(() => {
        formik.resetForm({values:""});
        router.push("/login");
      }, 2500);
    } 

    else if (res.status == 500) {
      toast("Internal Server Error, Please try again later !");
    }
  }

  return (
    <>
    <Toaster/>
    <div className="flex gap-x-4 flex-row">
      <Link className='border flex' href={"/candidate/signup"}>Candidate</Link>
      <Link className='border flex' href={"/company/signup"}>Company</Link>
      </div>
      <br />
     <div className="flex p-8">

     <form onSubmit={formik.handleSubmit} className='flex flex-col'>


        <input required className='border px-4 py-1' type="text" name='name' {...formik.getFieldProps("name")} placeholder='Enter your full name' />
        <input required className='border px-4 py-1' type="text" name='name' {...formik.getFieldProps("cname")} placeholder='Company name' />
        <input required className='border px-4 py-1' type="text" name='name' {...formik.getFieldProps("designation")} placeholder='Designation' />
        <input required className='border px-4 py-1' type="email" name='email'{...formik.getFieldProps("email")} placeholder='Work email address' />
        <input required maxLength={10} className='border px-4 py-1' type="tel" name='mobile' {...formik.getFieldProps("mobile")} placeholder='Enter your mobile' />
        <input required className='border px-4 py-1' type="password" name='password' {...formik.getFieldProps("password")} placeholder='create password' />

        <button type="submit" className='border bg-slate-300 px-4 py-1 text-center'>sign up</button>

        Have an account?<Link href={"/login"} className="border px-4 py-1 text-center mt-4">Login</Link>
      </form>

     </div>
    </>
  )
}

export default CompanySignup