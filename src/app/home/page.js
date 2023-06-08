"use client";

import { redirect } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';

const Dashboard = () => {

  const { data:session, status} = useSession({
    required:true,
    onUnauthenticated(){
      redirect("/login");
    }
  })

  async function handleSignout() {
    signOut();
  }

  return (
    <>
      <div>Welcome to Home page {session?.user.name}</div>
      <button type='submit' onClick={handleSignout} className='px-4 py-1 bg-red-200 text-red-600'>Logout</button>
    </>
  )
}

export default Dashboard