"use server";

import { signOut } from "@/auth";
import { prisma } from "@/prisma";

export const logOut = async () => {
  await signOut();

  return "/auth"; // Return the redirect URL instead of calling redirect()
};

// Define an action to get a user based on their email
export const getUser = async (email: string | null | undefined) => {
  if (!email) return;

  return await prisma.user.findUnique({
    where: {
      email,
    },
    include: {
      chats: true,
      messages: true,
    },
  });
};
