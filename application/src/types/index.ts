export type UserType = {
  id: string;
  email: string;
  emailVerified: Date | null | string;
  public: boolean;
  name: string | null;
  image: string | null;
  bio: string | null;
  status: string;
  theme: string;
  settings: Record<string, unknown>;
  createdAt: Date | string;
  updatedAt: Date | string;
};

export type ChatType = {
  id: string;
  type: string;
  name: string | null;
  image: string | null;
  createdAt: Date | null | string;
  updatedAt: Date | null | string;
  users: {
    id: string;
    userId: string;
    chatId: string;
    role: string;
    user: UserType;
    chat: ChatType;
    createdAt: Date | null | string;
    updatedAt: Date | null | string;
  }[];
};

export type ChatsType = ChatType[];
