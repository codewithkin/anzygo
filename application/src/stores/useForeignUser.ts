import { UserType } from "@/types";
import { create } from "zustand";

export const useForeignUser = create<{
  foreignUser: UserType | null | undefined;
  setForeignUser: (foreignUser: UserType | null | undefined) => void;
}>((set) => ({
  foreignUser: null,
  setForeignUser: (foreignUser) => set({ foreignUser }),
}));
