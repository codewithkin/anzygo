"use server";

import { auth, signOut } from "@/auth";
import { prisma } from "@/prisma";

export const logOut = async () => {
  await signOut();

  return "/auth"; // Return the redirect URL instead of calling redirect()
};

// Define an action to get a user based on their email
export const getUser = async () => {
  const session = await auth();

  const email = session?.user?.email || "";

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  const chatUser = await prisma.chatUser.findFirst({
    where: {
      userId: user?.id,
    }
  });

  console.log("Chat user corresponding to this user: ", chatUser);

  const chats = await prisma.chat.findMany({
    where: {
      users: {
        some: {
          userId: chatUser?.id
        }
      }
    },
  })

  console.log("This user's chats: ", chats);

  return { user, chats };
};

export const getSpecificUser = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      messages: true,
    },
  });

  return user;
};
