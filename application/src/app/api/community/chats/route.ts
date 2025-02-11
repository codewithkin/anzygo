/**
 * This API route is called when a user wants to create a new private chat with another user.
 *
 * The route expects the following parameters:
 * - id: The id of the user to create the chat with.
 *
 * The route does the following:
 * 1. It checks if the user is authenticated, and gets the user's id from the session.
 * 2. It creates a new chat in the database, with the two users as admins.
 * 3. It returns the newly created chat.
 */

import { auth } from "@/auth";
import { getUser } from "@/lib/actions";
import { prisma } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Get the id of the user to create the chat with from the request
    const id = request.nextUrl.searchParams.get("id") || "";

    // Check if the user is authenticated, and get the user's id from the session
    const session = await auth();
    const userEmail = session?.user?.email || "";

    const user = await getUser();

    const userId = user?.id;

    // Check if there is an existing chat between the users
    const existingChat = await prisma.chat.findFirst({
      where: {
        type: "private",
        users: {
          some: {
            id: id,
          },
        },
      },
    });

    // If there is an existing chat, return it
    if(existingChat) {
      // Redirect to /chats?id=existingChatID
      return NextResponse.json({ message: "Chat already exists" });
    }

    // Create a new chat in the database (without the users)
    const newChat = await prisma.chat.create({
      data: {
        type: "private",
      },
    });

    // Create a new chatUser for each of the 2 users
    const chatUser1 = await prisma.chatUser.create({
      data: {
        chat: {
          connect: {
            id: newChat.id
          }
        },
        user: {
          connect: {
            id: userId
          }
        },
        role: "admin",
      },
    });

    const chatUser2 = await prisma.chatUser.create({
      data: {
        userId: id,
        chatId: newChat.id,
        role: "admin",
      },
    });

    // Add the chat users to the newly created chat
    await prisma.chat.update({
        where: {
          id: newChat.id,
        },
        data: {
          users: {
            connect: [
              {
                id: userId
              },
              {
                id
              }
            ],
          },
        },
      });

    // Log the newly created chat to the console
    console.log(newChat);

    // Return the newly created chat
    return NextResponse.json(newChat);
  } catch (error) {
    // Log any errors that occur during the creation of the chat
    console.error("An error occurred while creating a new chat: ", error);

    // Return a 500 error with a message
    return NextResponse.json(
      {
        message: "An error occurred while creating a new chat",
      },
      { status: 500 },
    );
  }
}
