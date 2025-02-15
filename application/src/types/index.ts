export type UserType = {
  id: string;
  email: string;
  emailVerified: Date | null | string;
  public: boolean;
  name: string;
  image: string;
  bio: string;
  status: string;
  theme: string;
  settings: any;
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
