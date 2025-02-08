import { getCurrentSession } from "@/lib/auth/get-current-session";
import { redirect } from "next/navigation";

export default async function Home() {

 const { session } = await getCurrentSession();

 if(!session) return redirect("/login");

 return redirect("/user-page");

}
