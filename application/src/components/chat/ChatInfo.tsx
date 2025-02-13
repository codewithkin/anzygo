import {
  PictureInPicture2,
  ChevronDown,
  Video,
  File,
  Link,
  Music,
  Mic,
} from "lucide-react";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Avatar } from "@heroui/avatar";

export default function ChatInfo({ chat }: { chat: any }) {
  const people = chat?.chat?.users || [];

  console.log("Chat data according to chat info: ", chat);

  return (
    chat && (
      <article className="flex flex-col gap-2 min-w-[300px] text-slate-800 font-semibold">
        <Card className="max-h-[300px] min-w-[300px] overflow-y-scroll min-h-4/5">
          <CardHeader className="w-full items-center justify-between">
            <CardTitle className="text-xl">Chat Info</CardTitle>
          </CardHeader>

          <CardContent>
            <article className="flex flex-col gap-1">
              <h4 className="font-semibold ">Files</h4>
              <article className="flex flex-col gap-4">
                <article className="flex flex-col gap-2">
                  <article className="w-full flex justify-between items-center">
                    <article className="flex items-center gap-2 text-sm font-normal">
                      <PictureInPicture2 size={20} strokeWidth={1} />
                      <p>{chat?.messages || 0} Photos</p>
                    </article>
                    <ChevronDown size={20} strokeWidth={1.5} />
                  </article>

                  {/* Map all files */}
                  <article className="flex gap-2 items-center w-full overflow-x-scroll">
                    
                  </article>
                </article>

                <article className="flex flex-col gap-2">
                  <article className="w-full flex justify-between items-center">
                    <article className="flex items-center gap-2 text-sm font-normal">
                      <Video size={20} strokeWidth={1} />
                      <p>{chat?.messages || 0} Videos</p>
                    </article>
                    <ChevronDown size={20} strokeWidth={1.5} />
                  </article>
                </article>

                <article className="flex flex-col gap-2">
                  <article className="w-full flex justify-between items-center">
                    <article className="flex items-center gap-2 text-sm font-normal">
                      <File size={20} strokeWidth={1} />
                      <p>{chat?.messages || 0} Files</p>
                    </article>
                    <ChevronDown size={20} strokeWidth={1.5} />
                  </article>
                </article>

                <article className="flex flex-col gap-2">
                  <article className="w-full flex justify-between items-center">
                    <article className="flex items-center gap-2 text-sm font-normal">
                      <Link size={20} strokeWidth={1} />
                      <p>{chat?.messages || 0} Shared Links</p>
                    </article>
                    <ChevronDown size={20} strokeWidth={1.5} />
                  </article>
                </article>

                <article className="flex flex-col gap-2">
                  <article className="w-full flex justify-between items-center">
                    <article className="flex items-center gap-2 text-sm font-normal">
                      <Music size={20} strokeWidth={1} />
                      <p>{chat?.messages || 0} Audio Files</p>
                    </article>
                    <ChevronDown size={20} strokeWidth={1.5} />
                  </article>
                </article>

                <article className="flex flex-col gap-2">
                  <article className="w-full flex justify-between items-center">
                    <article className="flex items-center gap-2 text-sm font-normal">
                      <Mic size={20} strokeWidth={1} />
                      <p>{chat?.messages || 0} Voice Messages</p>
                    </article>
                    <ChevronDown size={20} strokeWidth={1.5} />
                  </article>
                </article>
              </article>
            </article>
          </CardContent>
        </Card>

        <Card className="bg-primary text-white">
          <CardHeader>
            <CardTitle className="text-2xl">People in this conversation</CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col gap-2">
            {people.map((person: { avatar: string; name: string }) => (
              <article className="flex gap-2 items-center" key={person?.id}>
                <Avatar 
                  src={person?.user?.image} 
                  radius="md" 
                  size="md" 
                  name={person?.user?.name || "Kin"} 
                />

                <h2 className=" font-semibold">{person?.user?.name}</h2>
              </article>
            ))}
          </CardContent>
        </Card>
      </article>
    )
  );
}
