import { Avatar } from "@heroui/avatar";
import { Input } from "@heroui/input";
import { Box, Eye, EyeClosedIcon, MessagesSquare, Mic, MoreHorizontal, Paperclip, Phone, Search, SendHorizontal } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "../ui/button";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const StatusIndicator = ({ status }: { status: "online" | "offline" | "typing" }) => (
  <article className="flex gap-1 items-center">
    <article
      className={`w-2 h-2 rounded-full ${
        status !== "online"
          ? status === "offline"
            ? "bg-red-400"
            : "bg-orange-400"
          : "bg-green-400"
      } `}
    ></article>
    <p
      className={`${
        status !== "online"
          ? status === "offline"
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
      <Tooltip>
        <TooltipTrigger>
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
        </TooltipTrigger>
        <TooltipContent>More options</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </article>
);

const Header = ({ user }: { user: any }) => {
  let status = user?.status;

  return (
    <article className="w-full flex justify-between items-center py-2">
      <article className="flex flex-col gap-2 w-full">
        <article className="flex items-center gap-2">
          <Avatar
            className="w-8 h-8 text-sm"
            showFallback
            isBordered
            color="primary"
            name={user?.name}
            radius="full"
            src={user?.image}
          />
          <h2 className="text-xl font-semibold">{user?.name}</h2>
        </article>
        <StatusIndicator status={status} />
      </article>
      <Tools />
    </article>
  );
};

export type Message = {
  user: {
    name: string;
    avatar: string;
  };
  message: string;
  metadata: {
    sendTime: string | Date;
    seen: number;
  };
};

const Messages = ({ messageData }: { messageData: Message[] }) => (
  <article className="w-full gap-4 flex flex-col h-4/5 overflow-y-scroll">
    {messageData.length > 0 ? (
      messageData.map((message: Message) => (
        <article
          key={message.message}
          className={`flex flex-col gap-1 w-full ${
            message.user.name === "Kin Leon Zinzombe" && "items-end"
          }`}
        >
          <p
            className={` ${
              message.user.name === "Kin Leon Zinzombe"
                ? "bg-primary text-white rounded-tr-xl rounded-tl-xl rounded-bl-xl"
                : "bg-gray-200 rounded-tr-xl rounded-tl-xl rounded-br-xl"
            } text-sm p-4 max-w-[400px]`}
          >
            {message.message}
          </p>
          <p className="text-slate-400 text-xs flex w-fit gap-2">
            {message.user.name === "Kin Leon Zinzombe" ? (
              <Eye size={16} />
            ) : (
              <EyeClosedIcon size={16} />
            )}
            <span>{message.metadata.sendTime}</span>
          </p>
        </article>
      ))
    ) : (
      <article className="w-full h-full flex flex-col justify-center items-center">
        <h3 className="font-semibold text-xl">No messages yet</h3>
        <p className="text-slate-400">Go on...say something</p>
      </article>
    )}
  </article>
);

const MessageInput = () => (
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
    endContent={
      <article className="flex items-center gap-2">
        <Mic className="text-slate-400" size={20} strokeWidth={1} />
        <SendHorizontal className="text-slate-400" size={20} strokeWidth={1} />
      </article>
    }
  />
);

function Page({ chat, id }: { chat: any; id?: string }) {
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

  const messages = [];

  return (
    <article className="h-full flex flex-col justify-between w-3/4">
      <Header user={chat?.user} />
      <Messages messageData={messages} />
      <MessageInput />
    </article>
  );
}

export default Page;