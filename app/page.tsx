import { getSession } from '@/lib/auth'
import Link from 'next/link'
import { redirect, useRouter } from 'next/navigation'
import React from 'react'

const Home = async () => {
  const user = await getSession()
  if (!user) {
    redirect('/signin')
  }
  redirect('/comps')
  return <></>
}

export default Home
