import { formatDistanceToNow } from "date-fns";
import { Search } from "lucide-react";
import {Avatar} from "@heroui/avatar";
import {Input} from "@heroui/input";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

const LeftBar = () => {
    // Dummy chats
    const chats = [
       {
           id: 1,
           name: "John Doe",
           lastMessage: {
               content: "Hello, how are you?",
               time: new Date() - 2 * 60 * 1000 //5 minutes ago
           },
           profilePicture: "/images/kin.jpg"
       },
       {
        id: 2,
        name: "Jane Doe",
        lastMessage: {
            content: "Hey there Kin, you still up for tomorrow ?",
            time: new Date() - 20 * 60 * 1000 //20 minutes ago
        },
        profilePicture: "/images/ki.jpg"
        },
        {
            id: 3,
            name: "Bob Smith",
            lastMessage: {
                content: "You'll have it by Friday, Promise.",
                time: new Date() - 40 * 60 * 1000 //40 minutes ago
            },
            profilePicture: "/images/morty.jpeg"
        }
    ]

  return (
    <article className="h-full w-full">
        {/* SearchBar */}
        <Input 
            classNames={{
                input: "placeholder:text-slate-400 bg-primary/40"
            }}
            startContent={<Search size={20} className="text-slate-400" />}
            placeholder="Search"
            type="search"
        />

        {/* Chats List */}
        <article className="flex flex-col gap-2 my-4">
            {
                chats.length > 0 ? 
                    chats.map((chat) => (
                        <article
                            key={chat.id}
                            className="flex gap-4 items-center p-2 rounded-xl"
                        >
                                <Avatar 
                                    className="w-12 h-12 text-sm"
                                    showFallback
                                    isBordered
                                    color="default"
                                    name={chat.name}
                                    radius="lg"
                                    src={chat.profilePicture}
                                />

                                <article>
                                    <h3 className="text-md font-medium">{chat.name}</h3>
                                    <p className="text-primary text-regular text-xs">{chat.lastMessage.content.substring(0, 20).concat("...")}</p>
                                </article>
                        </article>
                    ))
                :
                <article className="flex flex-col jusitfy-center items-center gap-4 w-full h-full">
                    <Image
                        src="/images/illustrations/astronaut.jpg"
                        width={200}
                        height={500}
                        alt="No chats found image"
                    />

                    <article className="flex flex-col gap-2">
                        <h4 className="text-xl text-slate-400">Sorry, no chats found</h4>
                        <Button className="transition duration-300 hover:bg-slate-400 hover:text-slate-800" asChild>
                            <Link href="#">
                                New Chat
                            </Link>
                        </Button>
                    </article>
                </article>
            }
        </article>
    </article>
  )
}

export default LeftBar;
