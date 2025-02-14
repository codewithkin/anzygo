export type UserType = {
  id: string;
  email: string;
  emailVerified: string;
  public: boolean;
  name: string;
  image: string;
  bio: string;
  status: "Away" | "Online" | "Typing";
  theme: string;
  settings: any;
  createdAt: string;
  updatedAt: string;
};

export type ChatType = {
  id: string;
  type: string;
  name: string | null;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
  users: {
    id: string;
    userId: string;
    chatId: string;
    role: string;
    user: UserType;
    chat: ChatType;
    createdAt: Date;
    updatedAt: Date;
  }[];
};

export type ChatsType = ChatType[];
