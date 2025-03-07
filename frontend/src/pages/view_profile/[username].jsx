import { useSearchParams } from 'next/navigation'
import React from 'react'

export default function ViewProfilePage() {
  const searchParams=useSearchParams();
  console.log("View Profile")
  return (
    <div>
      ViewProfilePage
    </div>
  )
}

export async function getServerSideProps(){
  return {props:{}}
}
