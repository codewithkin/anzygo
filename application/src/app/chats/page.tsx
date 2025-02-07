import LeftBar from "@/components/chat/LeftBar";
import Page from "@/components/chat/Page";
import ChatInfo from "@/components/chat/ChatInfo";

export default function Chats() {
  return (
    <article className="flex h-full flex-col p-4 w-full">
      {/* Chats list, chat page + Chat details */}
      <article className="flex gap-4 items-center w-full h-full">
        {/* Chats list, chat page */}
        <article className="rounded-xl bg-white p-4 min-w-[400px] w-full h-full flex gap-8 items-center">
          {/* Searchbar and chat list */}
          <LeftBar />

          {/* Chat Page */}
          <Page />
        </article>

        {/* Chats details */}
        <ChatInfo />
      </article>
    </article>
  );
}