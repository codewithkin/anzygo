import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify your email",
  description: "We know you're excited, sign in to get started with Anzygo !",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>{children}</>
  )
}

