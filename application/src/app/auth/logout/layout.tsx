import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Don't go :(",
  description: "You are being logged out of Anzygo",
};

function LogoutComponent({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export default LogoutComponent;
