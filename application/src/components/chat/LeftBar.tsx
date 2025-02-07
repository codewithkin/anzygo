import { formatDistanceToNow } from "date-fns";
import { Search } from "lucide-react";
import {Avatar} from "@heroui/avatar";
import {Input} from "@heroui/input";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

const SearchBar = () => {
    return (
        <Input 
            className="max-w-[300px]"
            classNames={{
                input: "placeholder:text-slate-400 bg-primary/40 max-h-[300px]"
            }}
            startContent={<Search size={20} className="text-slate-400" />}
            placeholder="Search"
            type="search"
        />
    )
}

const ChatCard = ({chat}: {chat: any}) => {
    return (
        <article
            className={`flex gap-4 items-center p-2 rounded-xl hover:cursor-pointer transition-all duration-500 hover:bg-gray-200 ${chat.active && "bg-slate-200"}`}
        >
            <Avatar 
                className="w-12 h-12 text-sm"
                showFallback
                isBordered
                color="default"
                name={chat.name}
                src={chat.profilePicture}
            />

            <article>
                <h3 className="text-md font-medium">{chat.name}</h3>
                <p className="text-primary text-regular text-xs">{chat.lastMessage.content.substring(0, 20).concat("...")}</p>
            </article>
        </article>
    )
}

const NoChatsFound = () => {
    return (
        <article className="flex flex-col jusitfy-center items-center gap-4 w-full h-full">
            <Image
                src="/images/illustrations/astronaut.jpg"
                width={200}
                height={500}
                alt="No chats found image"
            />

            <article className="flex flex-col gap-2 text-center">
                <h4 className="text-xl text-slate-400">Sorry, no chats found</h4>
                <Button className="transition duration-300 hover:bg-slate-400 hover:text-slate-800" asChild>
                    <Link href="#">
                        New Chat
                    </Link>
                </Button>
            </article>
        </article>
    )
}

const LeftBar = ({chats}: { chats: any }) => {
    return (
        <article className="h-full w-1/3">
            <SearchBar />

            <article className="flex flex-col gap-2 my-4">
                {
                    chats.length > 0 ? 
                        chats.map((chat: any) => (
                            <ChatCard key={chat.id} chat={chat} />
                        ))
                    :
                    <NoChatsFound />
                }
            </article>
        </article>
    )
}

export default LeftBar;

