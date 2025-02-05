import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Oops! Something went wrong",
  description: "An error occurred while signing in to Anzygo. Please try again later.",
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