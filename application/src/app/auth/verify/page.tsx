"use client";
import Image from "next/image";
import { RightContent } from "@/components/auth/RightContent";
import Link from "next/link";
import { motion } from "framer-motion";
import { MailCheck } from "lucide-react";
import EmailSend from "@/components/icons/EmailSend";

export default function Verify() {
  return (
    <div className="grid md:grid-cols-2 min-h-screen">
      {/* Left Content */}
      <motion.article
        initial={{
          x: -200,
          opacity: 0,
          display: "none",
        }}
        animate={{
          x: 1,
          opacity: 1,
          display: "flex",
        }}
        transition={{
          duration: 0.3,
          stiffness: 1,
        }}
        className="flex flex-col md:gap-12 py-16 md:px-16 justify-center px-4"
      >
        <EmailSend />

        {/* Logo and Title */}
        <article className="flex items-center">
          <Image
            src="/images/brand/icon.png"
            alt="Anzygo logo"
            width={32}
            height={32}
          />

          <h2 className="text-primary font-semibold">Anzygo</h2>
        </article>

        {/* Heading and paragraph */}
        <article className="grid gap-2">
          <h2 className="font-semibold text-2xl">One last step</h2>
          <p className="text-sm text-gray-500 font-light">
            Please check your email for a sign in link
          </p>
        </article>

        <p className="text-sm text-gray-500 font-light">
          Can't find it ?{" "}
          <Link className="font-semibold text-primary" href="/auth">
            Try Again
          </Link>
        </p>
      </motion.article>

      {/* Right Content */}
      <RightContent />
    </div>
  );
}
