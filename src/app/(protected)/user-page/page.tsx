
import DummyComponent from '@/components/protected/DummyComponent';
import { getCurrentSession } from '@/lib/auth/get-current-session';
import { redirect } from 'next/navigation';
import React from 'react'

type Props = object;

export default async function Page({}: Props) {

  const { session } = await getCurrentSession(); 

  if(session?.id === null) return redirect("/login");


  return <DummyComponent />
}