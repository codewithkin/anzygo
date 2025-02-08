"use client";
import {
  ArchiveRestore,
  Boxes,
  DoorOpen,
  MessagesSquare,
  Settings,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { logOut } from "@/lib/actions";

export default function Sidebar() {
  // Get the current url
  const pathname = usePathname();

  return (
    <aside className="p-2 rounded-xl flex flex-col items-center justify-between h-screen">
      {/* App Icon */}
      <Image
        src="/images/brand/icon.png"
        width={48}
        height={48}
        alt="Anzygo Icon"
      />

      {/* Link Icons */}
      <ul className="text-slate-500 flex flex-col items-center gap-2">
        <li>
          <Link
            className="text-xs flex flex-col justify-center items-center hover:bg-slate-600 hover:text-slate-800 transition-all duration-300 p-2 rounded-xl"
            href="/chats"
          >
            <MessagesSquare
              strokeWidth={pathname === "/chats" ? 2 : 1}
              size={20}
              fill={pathname === "/chats" ? "#64748b" : "none"}
            />
            All Chats
          </Link>
        </li>
        <li>
          <Link
            className="text-xs flex flex-col justify-center items-center hover:bg-slate-600 hover:text-slate-800 transition-all duration-300 p-2 rounded-xl"
            href="/chats/groups"
          >
            <Boxes
              strokeWidth={pathname === "/chats/groups" ? 2 : 1}
              size={20}
              fill={pathname === "/chats/groups" ? "#64748b" : "none"}
            />
            Groups
          </Link>
        </li>
        <li>
          <Link
            className="text-xs flex flex-col justify-center items-center hover:bg-slate-600 hover:text-slate-800 transition-all duration-300 p-2 rounded-xl"
            href="/chats/archives"
          >
            <ArchiveRestore
              strokeWidth={pathname === "/chats/archives" ? 2 : 1}
              size={20}
              fill={pathname === "/chats/archives" ? "#64748b" : "none"}
            />
            Archived
          </Link>
        </li>

        <Separator className="w-8 my-4 bg-slate-500" />

        <li>
          <Link
            className="text-xs flex flex-col justify-center items-center hover:bg-slate-600 hover:text-slate-800 transition-all duration-300 p-2 rounded-xl"
            href="/profile"
          >
            <User
              strokeWidth={pathname === "/profile" ? 2 : 1}
              size={20}
              fill={pathname === "/profile" ? "#64748b" : "none"}
            />
            Profile
          </Link>
        </li>

        <li>
          <Link
            className="text-xs flex flex-col justify-center items-center hover:bg-slate-600 hover:text-slate-800 transition-all duration-300 p-2 rounded-xl"
            href="/profile"
          >
            <Settings
              strokeWidth={pathname === "/profile" ? 2 : 1}
              size={20}
              fill={pathname === "/profile" ? "#64748b" : "none"}
            />
            Settings
          </Link>
        </li>
      </ul>

      <Button
        onClick={async () => await logOut}
        className="text-xs flex flex-col justify-center items-center hover:bg-slate-600 hover:text-slate-800 transition-all duration-300 px-4 py-8 rounded-xl"
        type="button"
      >
        <DoorOpen size={20} />
        Log Out
      </Button>
    </aside>
  );
}
