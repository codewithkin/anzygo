import { Avatar } from "@heroui/avatar"
import { Input } from "@heroui/input"
import { Eye, EyeClosedIcon, MessagesSquare, Mic, MoreHorizontal, Paperclip, Phone, Search, SendHorizontal } from "lucide-react"

function Header () {
  const status: "online" | "offline" | "typing" = "online"

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
              <h2  className="text-xl font-semibold">John Doe</h2>

              </article>
              <article className="flex gap-1 items-center">
                <article className={`w-2 h-2 rounded-full ${status !== "online" ? (status === "offline" ? "bg-red-400" : "bg-orange-400") : "bg-green-400"} `}></article>
                <p className={`${status !== "online" ? (status === "offline" ? "text-red-400" : "text-orange-400") : "text-green-400"} text-xs`}>{status}</p>
              </article>
            </article>

            {/* Tools */}
            <article className="flex gap-4 items-center">
              <Search strokeWidth={1} className="text-slate-400 hover:cursor-pointer hover:text-slate-800 transition duration-300" />
              <Phone strokeWidth={1} className="text-slate-400 hover:cursor-pointer hover:text-slate-800 transition duration-300" />
              <MoreHorizontal strokeWidth={1} className="text-slate-400 hover:cursor-pointer hover:text-slate-800 transition duration-300" />
            </article>
        </article>
    )
}

export type Message ={
  user: {
    name: string,
    avatar: string
  },
  message: string,
  metadata: {
    sendTime: string | Date,
    seen: number
  }
}

function Page() {
  const messageData: Message[] = [
    {
      user: {
        name: "Jin Mori",
        avatar: "/images/mouse.jpg"
      },
      message: "Hey there Kin, Happy Friday ! Any plans for the weekend up ahead ? If not, you might have to start ANOTHER side project lol",
      metadata: {
        sendTime: "09:20",
        seen: 1
      }
    },
    {
      user: {
        name: "Jin Mori",
        avatar: "/images/jin.jpg"
      },
      message: "Seriously though, please don't start a new side project this weekend. I beg of you",
      metadata: {
        sendTime: "09:21",
        seen: 0
      }
    },
    {
      user: {
        name: "Kin Leon Zinzombe",
        avatar: "/images/kin.jpg"
      },
      message: "No promises lol. Actually scratch that, I will NOT follow that advice. SIDE PROJECTS RULE !!!",
      metadata: {
        sendTime: "09:21",
        seen: 0
      }
    }
  ]

  return (
    <article className="w-full h-full flex flex-col justify-between">
        <Header />

        {/* Messages */}
        <article
        className="w-full gap-4 flex flex-col h-4/5 overflow-y-scroll py-4">
          {
            messageData.length > 0 ?
            messageData.map((message: Message) => {
              return (
                <article key={message.message} className={`flex flex-col gap-1 w-full ${message.user.name === "Kin Leon Zinzombe" && "items-end"}`}>
                    <p className={` ${message.user.name === "Kin Leon Zinzombe" ? "bg-primary text-white rounded-tr-xl rounded-tl-xl rounded-bl-xl" : "bg-gray-200 rounded-tr-xl rounded-tl-xl rounded-br-xl"} text-sm p-4 max-w-[400px]`}>{message.message}</p>
                    <p className="text-slate-400 text-xs flex w-fit gap-2">
                  {
                    message.user.name === "Kin Leon Zinzombe" ?
                    <Eye size={16} /> :
                    <EyeClosedIcon size={16} />
                  }
                      <span>{message.metadata.sendTime}</span>
                    </p>

                  <article className={``}>

                  </article>
                </article>
              )
            })
            :
            <article>Wasssssah</article>
          }
        </article>

        {/* Input */}
        <Input
        className="py-2 h-1/5 justify-end flex flex-col"
          classNames={{
            inputWrapper: "justify-end flex flex-col absolute bottom-0",
            input: "bg-primary "
          }}
          placeholder="Say something..."
          startContent={<Paperclip className="text-slate-400" size={20} strokeWidth={1} />}
          endContent={
            <article className="flex items-center gap-2">
              <Mic className="text-slate-400" size={20} strokeWidth={1} />
              <SendHorizontal className="text-slate-400" size={20} strokeWidth={1}  />
            </article>
          }
        />
    </article>
  )
}

export default Page
