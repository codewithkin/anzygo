import { UserType } from "@/types";
import { create } from "zustand";

export const useUserInfo = create<UserType>((set) => ({
  id: "",
  email: "",
  emailVerified: "",
  public: true,
  name: "",
  image: "",
  bio: "",
  status: "Away",
  theme: "Default",
  settings: null,
  createdAt: "",
  updatedAt: "",
  setUserInfo: (userInfo: UserType) =>
    set((state) => ({
      ...state,
      ...userInfo,
    })),
}));
