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

  // Fetch the user based on email
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  console.log("This user: ", user);

  // Fetch all the chats the user is a part of using ChatUser
  const chatUsers = await prisma.chatUser.findMany({
    where: {
      userId: user?.id,
    },
    include: {
      chat: {
        include: {
          chatUsers: true, // Include users in the chat (optional)
          messages: {
            // Include last message (optional)
            orderBy: { createdAt: "desc" },
            take: 1,
          },
        },
      },
    },
  });

  // Extract the chats from the chatUser relation
  const chats = chatUsers.map((chatUser) => chatUser.chat);

  console.log("This user's chats: ", chats);

  return { user, chats };
};

export const getSpecificUser = async (id: string) => {
  // Find a chatUser with the corresponding id
  const chatUser = await prisma.chatUser.findFirst({
    where: {
      id,
    },
  });

  // Now find the user that the chatUser belongs to
  const user = await prisma.user.findUnique({
    where: {
      id: chatUser?.userId,
    },
  });

  console.log("SPECIFIC USER GOTTEN: ", user);

  return user;
};

export const getChatUsersInfo = async (ids: string[]) => {
  const chatUsers = await prisma.chatUser.findMany({
    where: {
      id: {
        in: ids,
      },
    },
  });

  return chatUsers;
};
