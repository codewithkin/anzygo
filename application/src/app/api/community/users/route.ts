/**
 * This API route is called when a user wants to fetch all public users, except themselves.
 *
 * The route does the following:
 * 1. It checks if the user is authenticated, and gets the user's id from the session.
 * 2. It creates 4 test users in the database, if they don't already exist.
 * 3. It fetches all public users, except the user themselves.
 * 4. It returns the fetched users to the frontend.
 */

import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
  try {
    // Get the user's id from the auth session
    const session = await auth();
    const userId = session?.user?.id;

    // Create 4 test users if they don't already exist
    const testUsers = [
      { email: "test1@example.com", name: "Test User 1", public: true },
      { email: "test2@example.com", name: "Test User 2", public: true },
      { email: "test3@example.com", name: "Test User 3", public: true },
      { email: "test4@example.com", name: "Test User 4", public: true },
    ];

    const createNewUsers = await prisma.user.createMany({
      data: testUsers,
      skipDuplicates: true,
    });

    // Fetch all public users, except the user themselves
    const users = await prisma.user.findMany({
      where: {
        public: true,
        id: {
          not: userId,
        },
      },
    });

    // Return the fetched users to the frontend
    return NextResponse.json(users);
  } catch (e) {
    console.log("An error occured while fetching users: ", e);

    return NextResponse.json({
      message: "An error occured",
    });
  }
}
