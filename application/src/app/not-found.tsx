import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <article
      style={{
        backgroundImage: `url("/images/backgrounds/404.jpg")`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
      className="flex h-screen items-center justify-center"
    >
      <article className="text-center">
        <h1
          style={{
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            WebkitTextStroke: "2px black",
          }}
          className="text-9xl font-black text-transparent"
        >
          404
        </h1>

        <p className="text-2xl font-bold">Page Not Found!</p>
        <Button
          asChild
          className="bg-white text-black font-semibold hover:bg-slate-800 hover:text-white rounded-full"
        >
          <Link className="flex gap-2 items-center rounded-full" href="/">
            Back Home
          </Link>
        </Button>
      </article>
    </article>
  );
}
