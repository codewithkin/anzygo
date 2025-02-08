"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useTransition } from "react";
import { logOut } from "@/lib/actions";
import DoorOpen from "@/components/icons/DoorOpen";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Logout() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  async function handleLogout(e: FormEvent<HTMLInputElement>) {
    e.preventDefault();

    startTransition(async () => {
      const res = await fetch("/api/mememe");

      if (res.status === 200) {
        router.push("/auth"); 
      }
    });
  }

  return (
    <main className="flex flex-col items-center justify-center h-screen gap-2">
      <DoorOpen />
      <h1 className="text-3xl font-bold">Leaving so soon?</h1>
      <article className="flex md:flex-row gap-2 items-center justify-center">
        <Button asChild className="hover:text-white hover:bg-primary" variant="outline">
          <Link className="border border-primary text-primary" href="/">
            Take me back
          </Link>
        </Button>

        <form method="POST" action="/api/auth/signout">
  <Button type="submit">Yes, log me out</Button>
</form>

      </article>
    </main>
  );
}
