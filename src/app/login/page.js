"use client";

import { useFormik } from "formik";
import Link from "next/link";
import { redirect } from "next/navigation";
import { signIn, useSession} from "next-auth/react";
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {

  const { status } = useSession();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit,
  });

  async function onSubmit(values) {
    const res = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl: "/dashboard",
    });

    if(res.error == null){
      toast.success("Login success, redirecting...")
      setInterval(() => {
        redirect(res.url);
      }, 2500);
    }
    else{
      toast.error(res.error, { duration:2500});
    }    
  }

  if(status === "loading"){
    return "loading..."
  }
  if(status === "authenticated"){
    redirect("/dashboard");
  }
 
  return (
    <>
    <Toaster/>

      <div className="flex p-8">
   

        <form onSubmit={formik.handleSubmit} className="flex flex-col">
          
          <input
            required
            className="border px-4 py-1"
            type="email"
            name="email"
            {...formik.getFieldProps("email")}
            placeholder="Email address"
          />
          <input
            required
            className="border px-4 py-1"
            type="password"
            name="password"
            {...formik.getFieldProps("password")}
            placeholder="Password"
          />
          <button
            type="submit"
            className="border bg-slate-300 px-4 py-1 text-center"
          >
            Login
          </button>
          Dont have an account?
          <Link href={"/candidate/signup"} className="border px-4 py-1 text-center mt-4">
            Sign up
          </Link>
        </form>
      </div>
    </>
  );
};

export default Login;
