import { signIn } from "@/auth";
import { SignInButton } from "@/components/auth/SignInButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import Image from "next/image";
import { motion } from "framer-motion";
import { RightContent } from "@/components/auth/RightContent";
import Link from "next/link";
import { ErrorTriangle } from "@/components/icons/ErrorTriangle";

export default function SignIn() {
  return (
    <div className="grid md:grid-cols-2 min-h-screen">
      {/* Left Content */}
      <article className="flex flex-col gap-8 md:gap-12 py-16 md:px-16 justify-center px-4">
        <ErrorTriangle />

        {/* Heading and paragraph */}
        <article className="grid gap-2">
          <h2 className="font-semibold text-2xl text-red-500">
            Something went wrong
          </h2>
          <p className="text-sm text-gray-500 font-light">
            No fret, let's give it another try
          </p>
        </article>

        <Button
          className="w-fit bg-red-500 hover:bg-red-800 hover transition duration-300"
          asChild
        >
          <Link href="/auth">
            <span>Try again</span>
          </Link>
        </Button>
      </article>

      {/* Right Content */}
      <RightContent />
    </div>
  );
}
