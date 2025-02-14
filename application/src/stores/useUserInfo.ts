import { UserType } from "@/types";
import { create } from "zustand";

export const useUserInfo = create<{ userInfo: UserType | null }>((set) => ({
  userInfo: null,
  setUserInfo: (userInfo: UserType) =>
    set((state) => ({
      ...state,
      userInfo,
    })),
}));
