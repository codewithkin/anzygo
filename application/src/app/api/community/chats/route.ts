/**
 * This API route is called when a user wants to create a new private chat with another user.
 *
 * The route expects the following parameters:
 * - id: The id of the user to create the chat with.
 *
 * The route does the following:
 * 1. It checks if the user is authenticated, and gets the user's id
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

    // Check if the user is authenticated, and get the user's id
    const user = await getUser();

    const userId = user?.id;

    // If the user is not authenticated, return a 401 error
    if (!userId) {
      console.log("ALERT: User is not authenticated");

      return NextResponse.json(
        {
          message: "User is not authenticated",
        },
        { status: 401 },
      );
    }

    let thisUser = await prisma.chatUser.findFirst({
      where: {
        userId,
      },
    });

    let receivingUser = await prisma.chatUser.findFirst({
      where: {
        userId: id,
      },
    });

    console.log("This user: ", thisUser);
    console.log("Receiving user: ", receivingUser);

    let newChat;

    if (!thisUser || !receivingUser) {
      // Create a new chat in the database (without the users)
    newChat = await prisma.chat.create({
      data: {
        type: "private",
      },
    });

      // Create a new chatUser for each of the 2 users
      await prisma.chatUser.createMany({
        data: [
          {
            chatId: newChat.id,
            userId,
            role: "admin",
          },
          {
            chatId: newChat.id,
            userId: id,
            role: "admin",
          },
        ],
      });

      // Try finding the users again
      thisUser = await prisma.chatUser.findFirst({
        where: {
          userId,
        },
      });

      receivingUser = await prisma.chatUser.findFirst({
        where: {
          userId: id,
        },
      });
    }

    // Check if there is an existing chat between the users
    const existingChat = await prisma.chat.findFirst({
      where: {
        type: "private",
        users: {
          some: {
            id: {
              in: [receivingUser?.id, thisUser?.id],
            },
          },
        },
      },
    });

    // If there is an existing chat, return it
    if (existingChat) {
      console.log("ALERT: A chat already exists between these users");
      // Redirect to /chats?id=existingChatID
      return NextResponse.json({ message: "Chat already exists" });
    }

    // Create a new chat
    if(!newChat) {
      let newChat = await prisma.chat.create({
        data: {
          type: "private",
        },
      });

      // Add the users to the chat
    await prisma.chat.update({
      where: {
        id: newChat.id,
      },
      data: {
        users: {
          connect: [
            {
              id: thisUser?.id,
            },
            {
              id: receivingUser?.id,
            },
          ],
        },
      },
    });
    }

    

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
