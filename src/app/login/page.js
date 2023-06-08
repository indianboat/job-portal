"use client";

import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setCookie } from "nookies";

const Login = () => {

  const router = useRouter();
 
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit,
  });

  async function onSubmit(values){
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (data.message == "User not found!") {
        alert("User not found!");
      }
      else if(data.message == "Invalid Credentials"){
        alert("Invalid Credentials");
      }
      else if(data.message == "Login success"){
        setCookie(null, "token", data.token, { secure: process.env.NODE_ENV=="production", maxAge:60*60*5 });
        router.push("/home");
      }
    } catch (error) {
      alert(error.toString())
    }
  };

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
