import { Loader2 } from "lucide-react"

function Loading() {


  return (
    <section className="w-screen h-screen flex flex-col justify-center items-center gap-4">
        {/* Loading spinner */}
        <Loader2 className="animate-spin text-primary" size={50} />

        {/* Loading text */}
        <article className="flex flex-col gap-2 text-white text-center items-cenetr justify-center">
            <h2 className="text-xl font-semibold">Loading chats...</h2>
            <p className="text-sm">Please be patient, this will only take a minute</p>
        </article>
    </section>
  )
}

export default Loading
