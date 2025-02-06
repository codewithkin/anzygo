"use server";

import { signOut } from "@/auth";

export const logOut = async () => {
    // Sign the user out
    await signOut();
}