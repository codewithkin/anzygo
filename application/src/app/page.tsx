import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if(session?.user) {
    // Redirect to the chats page
    return redirect("/chats")
  }

  // Otherwise, redirect to the auth page
  return redirect("/auth");
}

