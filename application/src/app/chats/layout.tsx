import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
    title: "Your Chats",
    description: "Jump right back into your existing chats or start a new one, your call !"
}

export default function ChatsLayout({children}: {children: ReactNode}) {
  return (
    <section>

        {children}
    </section>
  );
}
