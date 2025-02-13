import {create} from "zustand"

interface SelectedChatState {
  selectedChat: any;
  setSelectedChat: (chat: any) => void;
}

export const useSelectedChatStore = create<SelectedChatState>((set: any) => ({
  selectedChat: null,
  setSelectedChat: (chat: any) => set({ selectedChat: chat }),
}));