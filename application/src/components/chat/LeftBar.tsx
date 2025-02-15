"use client";
import { formatDistanceToNow } from "date-fns";
import { FolderPlus, Plus, RefreshCw, Router, Search } from "lucide-react";
import { Avatar } from "@heroui/avatar";
import { Input } from "@heroui/input";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { Dispatch, useEffect, useState } from "react";
import { useSelectedChatStore } from "@/stores/useSelectedChat";
import { ChatsType, ChatType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { getSpecificUser } from "@/lib/actions";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { useRouter } from "next/navigation";
import useQueryStore from "@/providers/CustomQueryClientProvider";

const SearchBar = ({ chats }: { chats: ChatsType }) => {
  const [filteredChats, setFilteredChats] = useState<any | null>(null);
  const setSelectedChat = useSelectedChatStore(
    (state) => state.setSelectedChat,
  );

  const searchForUser = (term: string) => {
    try {
      console.log(chats);
      // Find a user with the search term
      const filteredUsers = chats.filter((chat: any) => {
        const regex = new RegExp(term, "i");
        return regex.test(chat?.user?.name) || regex.test(chat?.user?.email);
      });

      setFilteredChats(filteredUsers);

      console.log("Users searched for: ", filteredUsers);
    } catch (e) {
      console.log("Error while searching for user: ", e);
    }
  };

  return (
    <Input
      className="max-w-full"
      onChange={(e) => {
        if (e.target.value.length > 0) {
          searchForUser(e.target.value);
        } else {
          setFilteredChats(chats);
        }
      }}
      classNames={{
        input: "placeholder:text-slate-400 bg-primary/40 max-h-[300px]",
        inputWrapper: "bg-blue-200 hover:bg-slate-500",
      }}
      startContent={<Search size={20} className="text-slate-400" />}
      placeholder="Search"
      type="search"
    />
  );
};

const ChatCard = ({ chat }: { chat: ChatType }) => {
  const setSelectedChat = useSelectedChatStore(
    (state) => state.setSelectedChat,
  );

  // Get the receiving user's data
  const { data } = useQuery({
    queryKey: ["getSpecificUser"],
    queryFn: async () => await getSpecificUser(chat.users[1].id),
  });

  return (
    <article
      onClick={() => setSelectedChat(chat)}
      className={`flex gap-4 items-center p-2 rounded-xl hover:cursor-pointer transition-all duration-500 hover:bg-gray-200 ${chat.active && "bg-slate-200"}`}
    >
      <Avatar
        className="w-12 h-12 text-sm"
        showFallback
        isBordered
        radius="full"
        color="default"
        name={data?.name}
        src={data?.image || "/images/user.png"}
      />

      <article>
        <h3 className="text-md font-medium">{data?.name}</h3>
        <p className="text-primary text-regular text-xs">
          {chat?.type}
          {/* chat.lastMessage.content.substring(0, 20).concat("...") */}
        </p>
      </article>
    </article>
  );
};

const NoChatsFound = () => {
  return (
    <article className="flex flex-col justify-center items-center gap-4 w-full h-full">
      <Image
        src="/images/illustrations/astronaut.jpg"
        width={200}
        height={500}
        alt="No chats found image"
      />

      <article className="flex flex-col gap-2 text-center">
        <h4 className="text-xl text-slate-400">Sorry, no chats found</h4>
        <Button
          className="transition duration-300 hover:bg-slate-400 hover:text-slate-800"
          asChild
        >
          <Link href="/chats/new">New Chat</Link>
        </Button>
      </article>
    </article>
  );
};

const Controls = () => {
  // Get the router (for redirection)
  const router = useRouter();

  // Get the query client
  const queryClient = useQueryStore((state) => state.queryClient);

  return (
    <article className="flex justify-between items-center my-2 w-full">
      <h2 className="text-xl font-semibold">Anzygo</h2>

      {/* Actual controls */}
      <article className="flex gap-4 items-center my-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span>
                <Button
                  onClick={() => router.push("/chats/new")}
                  variant="outline"
                >
                  <Plus size={20} />
                </Button>
              </span>
            </TooltipTrigger>

            <TooltipContent>Start a new chat</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <span>
                <Button
                  onClick={() =>
                    queryClient.invalidateQueries({ queryKey: ["getUser"] })
                  }
                  variant="outline"
                >
                  <RefreshCw size={20} />
                </Button>
              </span>
            </TooltipTrigger>

            <TooltipContent>Refresh</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </article>
    </article>
  );
};

const LeftBar = ({ chats }: { chats: any }) => {
  const [filteredChats, setFilteredChats] = useState<any | null>(null);

  console.log("Chats according to leftbar: ", chats);

  useEffect(() => {
    setFilteredChats(chats);
  }, [chats]);

  return (
    <article className="h-full overflow-y-scroll w-1/4">
      <SearchBar chats={chats} />
      <Controls />

      <article className="flex flex-col md:gap-8 my-4 w-full h-full">
        {filteredChats ? (
          filteredChats.length > 0 ? (
            filteredChats.map((chat: any) => (
              <ChatCard key={chat.id} chat={chat} />
            ))
          ) : (
            <NoChatsFound />
          )
        ) : chats.length > 0 ? (
          chats.map((chat: any) => <ChatCard key={chat.id} chat={chat} />)
        ) : (
          <NoChatsFound />
        )}
      </article>
    </article>
  );
};

export default LeftBar;
