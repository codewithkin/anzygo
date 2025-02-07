import LeftBar from "@/components/chat/LeftBar";
import Page from "@/components/chat/Page";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, File, PictureInPicture2, Video } from "lucide-react";
import Image from "next/image";

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
        <article className="flex flex-col gap-2 max-w-[300px] text-slate-800 font-semibold">
          <Card>
            <CardHeader className="w-full items-center justify-between">
              <CardTitle>Chat Info</CardTitle>
            </CardHeader>

            <CardContent>
              <article className="flex flex-col gap-1">
                <h4 className="font-semibold text-sm">Files</h4>
                <article className="flex flex-col gap-4">
                  <article className="flex flex-col gap-2">
                  <article className="w-full flex justify-between items-center">
                    <article className="flex items-center gap-2 text-xs">
                      <PictureInPicture2 size={20} strokeWidth={1} />
                      <p>265 Photos</p>
                    </article>
                    <ChevronDown size={20} strokeWidth={1.5} />
                  </article>

                  <article className="flex gap-2 items-center w-full overflow-x-scroll">
                    <Image
                      className="rounded-xl"
                      src="/images/kin.jpg"
                      width={200}
                      height={80}
                      alt="Image"
                    />
                    <Image
                      className="rounded-xl"
                      src="/images/toast.jpg"
                      width={200}
                      height={80}
                      alt="Image"
                    />
                    <Image
                      className="rounded-xl"
                      src="/images/mouse.jpg"
                      width={200}
                      height={80}
                      alt="Image"
                    />
                  </article>
                  </article>

                  <article className="flex flex-col gap-2">
                    <article className="w-full flex justify-between items-center">
                      <article className="flex items-center gap-2 text-xs">
                        <Video size={20} strokeWidth={1} />
                        <p>27 Videos</p>
                      </article>
                      <ChevronDown size={20} strokeWidth={1.5} />
                    </article>
                  </article>

                  <article className="flex flex-col gap-2">
                    <article className="w-full flex justify-between items-center">
                      <article className="flex items-center gap-2 text-xs">
                        <File size={20} strokeWidth={1} />
                        <p>375 Filed</p>
                      </article>
                      <ChevronDown size={20} strokeWidth={1.5} />
                    </article>
                  </article>
                </article>
              </article>
            </CardContent>
          </Card>
          <article></article>
        </article>
      </article>
    </article>
  );
}

