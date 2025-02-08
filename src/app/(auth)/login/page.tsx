import LoginForm from "@/components/forms/auth/login-form";
import { getCurrentSession } from "@/lib/auth/get-current-session";
import { redirect } from "next/navigation";

type Props = object;

export default async function Page({}: Props) {

  const { session } = await getCurrentSession();

  if(session?.id) return redirect("/user-page");
  
  return (
    <div className='h-screen grid place-items-center'>
      <LoginForm />
    </div>
  )
}