import LeftBar from "@/components/chat/LeftBar";
import Page from "@/components/chat/Page";
import ChatInfo from "@/components/chat/ChatInfo";
import { auth } from "@/auth";
import { getUser } from "@/lib/actions";
import Link from "next/link";

export default async function Chats() {
  const session = await auth();

  if (!session) return;

  const user = await getUser(session?.user?.email);

  // Get the user's chats
  const chats = user?.chats;

  if (!chats) return null;

  let selectedChat;

  return (
    <article className="flex h-full flex-col p-4 w-full">
      {/* Chats list, selectedChat page + Chat details */}
      <article className="flex gap-4 items-center w-full h-full">
        {/* Chats list, selectedChat page */}
        <article className="rounded-xl bg-white p-4 min-w-[400px] w-full h-full flex gap-8 items-center">
          {/* Searchbar and chat list */}
          <LeftBar chats={chats} />

          {/* Chat Page */}
          <Page chat={selectedChat} />
        </article>

        {/* Chats details */}
        <ChatInfo chat={selectedChat} />
      </article>
    </article>
  );
}

export const dynamic = "force-dynamic";
