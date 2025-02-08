import Sidebar from "@/components/Sidebar";
import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Your Chats",
  description: "Jump right back into your existing chats or start a new one, your call!"
};

export default function ChatsLayout({
  children,
  modal, // This holds the modal
}: { children: ReactNode; modal?: ReactNode }) {
  return (
    <section className="flex bg-slate-800 h-screen w-screen overflow-hidden md:flex-row flex-col relative">
      <Sidebar />
      {children} {/* Main /chats content stays visible */}
      {modal}   {/* Modal shows on top when intercepted */}
    </section>
  );
}
