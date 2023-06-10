"use client";

import { useFormik } from "formik";
import Link from "next/link";
import { redirect } from "next/navigation";
import { signIn, useSession} from "next-auth/react";

const Login = () => {

  const { data:session} = useSession();

  if(session){
    redirect("/home");
  }
 
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit,
  });

  async function onSubmit(values) {
    const status = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl: "/home",
    });

    if(status.error == null){
      redirect("/home")
    }
    else{
      alert(status.error);
    }    
  }

  return (
    <>
      <div className="flex p-8">
        <form onSubmit={formik.handleSubmit} className="flex flex-col">
          <Link href={"/"}>Home</Link>
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
          <Link href={"/signup"} className="border px-4 py-1 text-center mt-4">
            Sign up
          </Link>
        </form>
      </div>
    </>
  );
};

export default Login;
