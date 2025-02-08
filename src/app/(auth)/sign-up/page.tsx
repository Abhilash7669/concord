import SignUpForm from '@/components/forms/auth/sign-up-form';
import { getCurrentSession } from '@/lib/auth/get-current-session';
import { redirect } from 'next/navigation';
import React from 'react'

type Props = object;

export default async function Page({}: Props) {

  const { session } = await getCurrentSession();

  if(session?.id) return redirect("/login");

  return (
    <main className="min-h-screen grid place-items-center">
      <SignUpForm />
    </main>      
  )
}