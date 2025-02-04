import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Anzygo: Communication - reimagined",
  description: "Take control of your conversations and chat your way !",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Get the current session
  const session = await auth();

  // If the user s not signed in...
  if(!session?.user.email) {
    console.log("Bro is logged out");

    // Redirect them to the sign in page
    return redirect("/auth");
  }

  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
