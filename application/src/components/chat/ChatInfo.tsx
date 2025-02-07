import { PictureInPicture2, ChevronDown, Video, File, Link, Music, Mic } from "lucide-react";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

export default function ChatInfo() {
  return (
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
                    <p>375 Files</p>
                  </article>
                  <ChevronDown size={20} strokeWidth={1.5} />
                </article>
              </article>

              <article className="flex flex-col gap-2">
                <article className="w-full flex justify-between items-center">
                  <article className="flex items-center gap-2 text-xs">
                    <Link size={20} strokeWidth={1} />
                    <p>20 Shared Links</p>
                  </article>
                  <ChevronDown size={20} strokeWidth={1.5} />
                </article>
              </article>

              <article className="flex flex-col gap-2">
                <article className="w-full flex justify-between items-center">
                  <article className="flex items-center gap-2 text-xs">
                    <Music size={20} strokeWidth={1} />
                    <p>12 Audio Files</p>
                  </article>
                  <ChevronDown size={20} strokeWidth={1.5} />
                </article>
              </article>

              <article className="flex flex-col gap-2">
                <article className="w-full flex justify-between items-center">
                  <article className="flex items-center gap-2 text-xs">
                    <Mic size={20} strokeWidth={1} />
                    <p>90 Voice Messages</p>
                  </article>
                  <ChevronDown size={20} strokeWidth={1.5} />
                </article>
              </article>
            </article>
          </article>
        </CardContent>
      </Card>
    </article>
  );
}
