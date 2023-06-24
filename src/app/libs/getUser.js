
export default async function getUser(email){

  const res = await fetch(`http://localhost:3000/api/users/${email}`);


  if(!res.ok){
    console.log(res.status);
    throw new Error("Failed to fetch data...")
  }


  return await res.json();
}

