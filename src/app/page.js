import Link from "next/link";

export default function Home() {
  return (
   <>
    <div className="p-8">
    <h1>Welcome to Job Portal</h1>
    <Link href={"/signup"} className="border bg-slate-200 px-4 py-1">Get started</Link>
    <Link href={"/login"} className="border px-4 py-1">Login</Link>
    </div>
   </>
  )
}
