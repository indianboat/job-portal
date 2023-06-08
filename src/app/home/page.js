"use client";

import { redirect, useRouter } from 'next/navigation';
import { destroyCookie, parseCookies } from 'nookies';
import jwt from "jsonwebtoken";

const Dashboard = () => {

  const router = useRouter();
  const { token } = parseCookies();

  if(!token){
    return router.push("/login");
  }
  const session = jwt.decode(token);

  const userLogout = () =>{
    destroyCookie(undefined, "token", { path:"/", secure:true });
    router.push("/login");
  }

  return (
    <>
    <div>Welcome to Home page {session?.name}</div>
    <button type='submit' onClick={userLogout} className='px-4 py-1 bg-red-200 text-red-600'>Logout</button>
    </>
  )
}

export default Dashboard