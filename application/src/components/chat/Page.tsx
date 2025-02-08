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
import { Button } from "../ui/button";
import Link from "next/link";

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
    <Search strokeWidth={1} className="text-slate-400 hover:cursor-pointer hover:text-slate-800 transition duration-300" />
    <Phone strokeWidth={1} className="text-slate-400 hover:cursor-pointer hover:text-slate-800 transition duration-300" />
    <MoreHorizontal strokeWidth={1} className="text-slate-400 hover:cursor-pointer hover:text-slate-800 transition duration-300" />
  </article>
);

const Header = () => {
  const status: "online" | "offline" | "typing" = "online";

  return (
    <article className="w-full flex justify-between items-center py-2 h-1/5">
      <article className="flex flex-col gap-2">
        <article className="flex items-center gap-2">
          <Avatar
            className="w-8 h-8 text-sm"
            showFallback
            isBordered
            color="primary"
            name="John Doe"
            radius="full"
            src="/images/mouse.jpg"
          />
          <h2 className="text-xl font-semibold">John Doe</h2>
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
  <article className="w-full gap-4 flex flex-col h-4/5 overflow-y-scroll py-4">
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
    className="py-2 h-1/5 justify-end flex flex-col"
    classNames={{
      inputWrapper: "justify-end flex flex-col absolute bottom-0",
      input: "bg-primary ",
    }}
    placeholder="Say something..."
    startContent={<Paperclip className="text-slate-400" size={20} strokeWidth={1} />}
    endContent={
      <article className="flex items-center gap-2">
        <Mic className="text-slate-400" size={20} strokeWidth={1} />
        <SendHorizontal className="text-slate-400" size={20} strokeWidth={1} />
      </article>
    }
  />
);

function Page({chat}: {chat: any}) {
  const messageData: Message[] = [
    {
      user: {
        name: "Jin Mori",
        avatar: "/images/mouse.jpg",
      },
      message:
        "Hey there Kin, Happy Friday ! Any plans for the weekend up ahead ? If not, you might have to start ANOTHER side project lol",
      metadata: {
        sendTime: "09:20",
        seen: 1,
      },
    },
    {
      user: {
        name: "Jin Mori",
        avatar: "/images/jin.jpg",
      },
      message: "Seriously though, please don't start a new side project this weekend. I beg of you",
      metadata: {
        sendTime: "09:21",
        seen: 0,
      },
    },
    {
      user: {
        name: "Kin Leon Zinzombe",
        avatar: "/images/kin.jpg",
      },
      message: "No promises lol. Actually scratch that, I will NOT follow that advice. SIDE PROJECTS RULE !!!",
      metadata: {
        sendTime: "09:21",
        seen: 0,
      },
    },
  ];

  if(!chat) {
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
    )
  }

  const messages = chat.filter((message: any) => message.sender = "user");

  return (
    <article className="h-full flex flex-col justify-between w-2/3">
      <Header />
      <Messages messageData={messages} />
      <MessageInput />
    </article>
  );
}

export default Page;

