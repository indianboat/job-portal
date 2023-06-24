"use client";

import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';

const Jobs = () => {

  const { data:session, status } = useSession(); // server side session

  if(status == "unauthenticated"){
    redirect("/login")
  }

  return (
    <>
      <div>Welcome to Job page {session?.user.email}</div>
    </>
  )
}

export default Jobs