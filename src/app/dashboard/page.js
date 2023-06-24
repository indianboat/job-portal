
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import Link from 'next/link';
import getUser from '../libs/getUser';
import { encode } from 'js-base64';

const Dashboard = async () => {

  const session = await getServerSession(authOptions);

  if(!session){
    redirect("/login")
  }
  const user = await getUser(session?.user.email);
  const encodeEmail = encode(session?.user.email)

  return (
    <>
      <div>Welcome to Home page {session?.user.name}</div>
      <div>Logged in as {session?.user.email}</div>
      <div className="">{user.role}</div>
      {
        user?.role == 'organization' ? 
        <>
        <Link href={`/company/addjob?account=${encodeEmail}`} className='px-4 py-1 bg-blue-200 text-red-600'>Add Job</Link> 
        <Link href={`/company/myjobs`} className='px-4 py-1 bg-blue-200 ml-2 text-red-600'>My Job</Link> 
        </>
        :
        
        <Link href={"/candidate/jobs"} className='px-4 py-1 bg-blue-200 text-red-600'>Jobs</Link>
      }
      
    </>
  )
}

export default Dashboard;