import { ReactNode } from "react";

export default function Content ({ children }: { children: ReactNode }) {
    return (
    <article className="flex h-full flex-col p-4 w-full">
        {children}
    </article>
    )
}