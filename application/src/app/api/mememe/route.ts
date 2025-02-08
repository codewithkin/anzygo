import { signOut } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await signOut();
    
    // Redirect to the authentication page after logout
    return NextResponse.json("/auth");
  } catch (e) {
    console.error("An error occurred during logout: ", e);
    return NextResponse.error();
  }
}

