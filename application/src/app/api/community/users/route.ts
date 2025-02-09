import { prisma } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Delete everything
    await prisma.user.deleteMany();

    // Create dummy users
    await prisma.user.create({
      data: {
        email: "kinzdj,df",
        name: "Kin test",
      },
    });

    await prisma.user.create({
      data: {
        email: ",df",
        name: "Kin test2",
      },
    });

    // Get all public users
    const users = await prisma.user.findMany({
      where: {
        public: true,
      },
    });

    console.log("Users: ", users);

    // return the users to the frontend
    return NextResponse.json(users);
  } catch (e) {
    console.log("An error occured while fetching users: ", e);
  }
}
