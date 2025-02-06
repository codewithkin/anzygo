import { MoreHorizontal, Phone, Search } from "lucide-react"

function Header () {
  const status: "online" | "offline" | "typing" = "typing"

    return (
        <article className="w-full flex justify-between items-center py-2">
            <article>
              <h2  className="text-2xl font-semibold">John Doe</h2>
              <article className="flex gap-1 items-center">
                <article className={`w-2 h-2 rounded-full ${status !== "online" ? (status === "offline" ? "bg-red-400" : "bg-orange-400") : "bg-green-400"} `}></article>
                <p className={`${status !== "online" ? (status === "offline" ? "text-red-400" : "text-orange-400") : "text-green-400"} text-xs`}>{status}</p>
              </article>
            </article>

            {/* Tools */}
            <article className="flex gap-4 items-center">
              <Search strokeWidth={1} className="text-slate-400" />
              <Phone strokeWidth={1} className="text-slate-400" />
              <MoreHorizontal strokeWidth={1} className="text-slate-400" />
            </article>
        </article>
    )
}

function Page() {
  return (
    <article className="w-full h-full">
        <Header />
    </article>
  )
}

export default Page
