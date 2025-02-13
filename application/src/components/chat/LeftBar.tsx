"use client";
import { formatDistanceToNow } from "date-fns";
import { Search } from "lucide-react";
import { Avatar } from "@heroui/avatar";
import { Input } from "@heroui/input";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { ChangeEvent, ChangeEventHandler, Dispatch, FormEvent, useEffect, useState } from "react";
import search from "@/helpers/misc/search";

const SearchBar = ({updateFn, chats}: {updateFn: Dispatch<any>,chats: any}) => {
  const searchForUser = (term: string) => {
    try {
      console.log(chats)
      // Find a user with the search term
      const filteredUsers = chats.filter((chat: any) => {
        const regex = new RegExp(term, "i");
        return (
          regex.test(chat?.user?.name) || regex.test(chat?.user?.email)
        );
      });

      updateFn(filteredUsers);

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
          updateFn(chats)
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

export interface Chat {
  createdAt: Date;
  id: string;
  image: string | null;
  name: string | null;
  type: "private" | "group";
  updatedAt: Date;
  users: {
    user: {
      id: string;
      name: string;
      image: string | null;
    };
  }[];
}

const ChatCard = ({ chat }: { chat: Chat }) => {
  /* // It seems the "chat" has missing or incomplete information on users
  // Fetch the particular user's data based on their id
  const {data} = useQuery({
    queryKey: ["getSpecificUser"],
    queryFn: async () => getSpecificUser(chat.users[0].id)
  }) */

  return (
    <article
      className={`flex gap-4 items-center p-2 rounded-xl hover:cursor-pointer transition-all duration-500 hover:bg-gray-200 ${chat.active && "bg-slate-200"}`}
    >
      <Avatar 
        className="w-12 h-12 text-sm"
        showFallback
        isBordered
        color="default"
        name={chat.users[0].user.name}
        src={chat.users[0].user.image || "/images/user.png"}
      />

      <article>
        <h3 className="text-md font-medium">{chat.users[0].user.name}</h3>
        <p className="text-primary text-regular text-xs">
          {chat.type}
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

const LeftBar = ({ chats }: { chats: any }) => {
  const [filteredChats, setFilteredChats] = useState<any | null>(null);

  useEffect(() => {
    setFilteredChats(chats);
  }, [chats]);

  return (
    <article className="h-full overflow-y-scroll w-1/3">
      <SearchBar updateFn={setFilteredChats} chats={chats} />

      <article className="flex flex-col md:gap-8 my-4 w-full h-full">
        {filteredChats ? 
         filteredChats.length > 0 ? (
          filteredChats.map((chat: any) => <ChatCard key={chat.id} chat={chat.chat} />)
        ) : (
          <NoChatsFound />
        )
        :
        chats.length > 0 ? (
          chats.map((chat: any) => <ChatCard key={chat.id} chat={chat.chat} />)
        ) : (
          <NoChatsFound />
        )
      }
      </article>
    </article>
  );
};

export default LeftBar;
