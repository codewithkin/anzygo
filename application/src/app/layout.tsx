import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/providers/QueryProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Anzygo: Communication - reimagined",
  description: "Take control of your conversations and chat your way !",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script src="https://cdn.lordicon.com/lordicon.js"></script>
        {/* Favicon file */}
      </head>
      <QueryProvider>
        <body
          className={`${poppins.className} antialiased h-screen w-screen overflow-hidden`}
        >
          {children}
        </body>
      </QueryProvider>
    </html>
  );
}
