"use client";

import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';

const Header = () => {

  const { data:session } = useSession();

  async function handleSignout() {
    signOut();
  }

  return (
    <>
     
      {
         
        session ? <>
        <Link href={"/dashboard"}>Home</Link><button type='submit' onClick={() => signOut()} className='px-4 py-1 bg-red-200 text-red-600'>Logout</button></> : <><div className='flex gap-x-3'>
        <Link href={"/"}>Home</Link><Link href={"/login"}>Login</Link><Link href="/candidate/signup">Sign up</Link></div></>
      }
            
    </>
  )
}

export default Header