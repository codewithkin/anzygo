"use client";
import { Avatar } from "@heroui/avatar";
import { Input } from "@heroui/input";
import {
  Box,
  Eye,
  EyeClosedIcon,
  MessagesSquare,
  Mic,
  MoreHorizontal,
  Paperclip,
  Phone,
  Search,
  SendHorizontal,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "../ui/button";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSelectedChatStore } from "@/stores/useSelectedChat";
import { urls } from "@/lib/urls";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import socket from "@/helpers/misc/socket";
import { getUser } from "@/lib/actions";
import { useQuery } from "@tanstack/react-query";
import { useUserInfo } from "@/stores/useUserInfo";

const StatusIndicator = ({
  status,
}: {
  status: "Away" | "Online" | "Typing";
}) => (
  <article className="flex gap-1 items-center">
    <article
      className={`w-2 h-2 rounded-full ${
        status !== "Online"
          ? status === "Away"
            ? "bg-red-400"
            : "bg-orange-400"
          : "bg-green-400"
      } `}
    ></article>
    <p
      className={`${
        status !== "Online"
          ? status === "Away"
            ? "text-red-400"
            : "text-orange-400"
          : "text-green-400"
      } text-xs`}
    >
      {status}
    </p>
  </article>
);

const Tools = () => (
  <article className="flex gap-4 items-center">
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Search
            strokeWidth={1}
            className="text-slate-400 hover:cursor-pointer hover:text-slate-800 transition duration-300"
          />
        </TooltipTrigger>
        <TooltipContent>Search</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger>
          <Phone
            strokeWidth={1}
            className="text-slate-400 hover:cursor-pointer hover:text-slate-800 transition duration-300"
          />
        </TooltipTrigger>
        <TooltipContent>Call</TooltipContent>
      </Tooltip>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreHorizontal
            strokeWidth={1}
            className="text-slate-400 hover:cursor-pointer hover:text-slate-800 transition duration-300"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </TooltipProvider>
  </article>
);

const Header = ({ user, status }: { user: any, status: "Away" | "Online" | "Typing" }) => {
  console.log("User according to Header: ", user);

  return (
    <article className="w-full flex justify-between items-center py-2">
      <article className="flex flex-col gap-2 w-full">
        <article className="flex items-center gap-2">
          <Avatar
            className="w-8 h-8 text-sm"
            showFallback
            isBordered
            color="primary"
            email={user?.email}
            radius="full"
            src={user?.image}
          />
          <h2 className="text-xl font-semibold">{user?.email}</h2>
        </article>
        <StatusIndicator status={status} />
      </article>
      <Tools />
    </article>
  );
};

export type Message = {
  user: {
    email: string;
    avatar: string;
  };
  message: string;
  metadata: {
    sendTime: string | Date;
    seen: number;
  };
};

const Messages = ({ messageData, email }: { email: any, messageData: {roomId: string, email: string, message: string}[] }) => {
  useEffect(() => {
    console.log("Message data: ", messageData);
  }, [messageData])

  return (
    <article className="w-full gap-4 flex flex-col h-4/5 overflow-y-scroll">
      {messageData.length > 0 ? (
        messageData.map((message: {roomId: string, email: string, message: string}) => (
          <article className={`rounded-xl p-4`} key={message.message}>
            {/* Message content */}
            <article className={`${email == message.email ? "bg-primary text-white" : "bg-slate-500 text-white"}`}>
              <p>{message.message}</p>
            </article>
          </article>
        ))
      ) : (
        <article className="w-full h-full flex flex-col justify-center items-center">
          <h3 className="font-semibold text-xl">No messages yet</h3>
          <p className="text-slate-400">Go on...say something</p>
        </article>
      )}
    </article>
  )
};

const MessageInput = ({ roomId, messages }: {roomId?: string, messages: any}) => {

  // Fetch the user's session info
  const { data } = useQuery({
    queryKey: ["getUser"],
    queryFn: async () => await getUser(),
  });

  console.log("Data according to message input: ", data)

  const [message, setMessage] = useState<string | undefined>("");

  const sendMessage = () => {
    if (socket) {
      socket.emit("send-dm", { roomId, email: data?.email || "misc", message });
    }
  }

  return (
    <form onSubmit={(e) => {
      e.preventDefault();


      if(message && message?.length > 0) {
        sendMessage();
      }

      setMessage("");
    }}>
      <Input
        className="py-2 justify-end flex flex-col"
        classNames={{
          inputWrapper: "justify-end flex flex-col absolute bottom-0",
          input: "bg-primary ",
        }}
        placeholder="Say something..."
        startContent={
          <Paperclip className="text-slate-400" size={20} strokeWidth={1} />
        }
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        endContent={
          <article className="flex items-center gap-2">
            <Mic className="text-slate-400" size={20} strokeWidth={1} />
            <Button type="submit" size="icon">
              <SendHorizontal className="text-white" size={20} strokeWidth={1} />
            </Button>
          </article>
        }
      />
    </form>
  )
};

function Page() {
  const chat = useSelectedChatStore((state) => state.selectedChat);

  const user = useUserInfo(state => state.userInfo);

  if(!user) return <h2>No user here</h2>;

  const email = user.email;

  console.log("Emaiiiiiiiiiiiiiiiiiiiiiiil: ", email)

  const [messages, setMessages] = useState<{roomId: string, email: string, message: string}[]>([]);

  useEffect(() => {
    // Listen for messages from server
    if (socket) {
      socket.on("receive-dm", (data: { roomId: string, email:  string, message: string }) => {
        console.log("DM received client-side: ", data);

        setMessages((prev) => [...prev, data]);
      });

      socket.on("user-joined", (data) => {
        console.log("User joined our room: ", data);

        setStatus("Online");
      })

      socket.on("disconnect", () => {
        setStatus("Away");
      })

      return () => {
        socket.off("message");
      };
    }
  }, [socket]);

  // Connect to a room
  useEffect(() => {
    if (socket && chat) {
      socket.emit("join-chat", chat.id);
    }
  }, [chat, socket]);

  // Track the other user's status
  const [status, setStatus] = useState<"Away" | "Online" | "Typing">("Away");

  if (!chat) {
    return (
      <article className="h-full flex flex-col justify-center items-center w-full">
        <article className="flex flex-col gap-2 justify-center items-center text-center">
          <Box className="text-slate-400" strokeWidth={1} size={100} />
          <h2 className="text-xl font-semibold">There's nothing here</h2>

          <article className="flex flex-col text-slate-400">
            <p>I'm bored, are you ?</p>
            <Button asChild>
              <Link className="" href="/chats/new">
                Let's start a new chat
              </Link>
            </Button>
          </article>
        </article>
      </article>
    );
  }

  return (
    <article className="h-full flex flex-col justify-between w-3/4">
      <Header status={status} user={chat?.user} />
      <Messages email={email} messageData={messages} />
      <MessageInput messages={messages} roomId={chat?.id} />
    </article>
  );
}

export default Page;
