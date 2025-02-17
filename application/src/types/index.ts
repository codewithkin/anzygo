import { JsonValue } from "@prisma/client/runtime/library";

export type UserType = {
  id: string;
  email: string;
  emailVerified: Date | null;
  public: boolean;
  name: string | null;
  image: string | null;
  bio: string | null;
  status: string;
  theme: string;
  settings: JsonValue,
  createdAt: Date;
  updatedAt: Date;
};

export type ChatType = {
  id: string;
  type: "private" | "group";
  name: string | null;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
  users: {
    id: string;
    userId: string;
    chatId: string;
    role: "admin" | "member";
    user: UserType;
    chat: ChatType;
    createdAt: Date;
    updatedAt: Date;
  }[];
  messages: MessageType[];
};

export type ChatsType = ChatType[];

export type MessageType = {
  id: string;
  chatId: string;
  senderId: string;
  content: string | null;
  type: "text" | "image" | "video" | "file";
  mediaId: string | null;
  readBy: string[] | null;
  sender: UserType;
  chat: ChatType;
  media: MediaType[];
  createdAt: Date;
  updatedAt: Date;
};

export type MediaType = {
  id: string;
  url: string;
  type: "image" | "video" | "file";
  messageId: string | null;
  message: MessageType | null;
  createdAt: Date;
  updatedAt: Date;
};

