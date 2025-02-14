// Data received when making a query to getUser
/*
    Example
    {
    "user": {
        "id": "cm73cxhnh0015a13p5waslxnm",
        "email": "admin@anzygo.online",
        "emailVerified": "2025-02-14T06:48:13.087Z",
        "public": true,
        "name": "79c5e729-2c62-438b-b53b-a0f6fde91bca",
        "image": "/images/user",
        "bio": "",
        "status": "Away",
        "theme": "Default",
        "settings": null,
        "createdAt": "2025-02-13T13:10:02.895Z",
        "updatedAt": "2025-02-14T06:48:13.089Z"
    },
    "chats": []
}

    Chat model
    // Chat Models
model Chat {
  id        String     @id @default(cuid())
  type      String // "private" | "group"
  name      String? // For group chats
  image     String? // Group chat image
  users     ChatUser[]
  messages  Message[]
  createdAt DateTime   @default(now())
  updatedAt DateTime   @updatedAt
}

model ChatUser {
  id     String @id @default(cuid())
  userId String
  chatId String
  role   String // "admin" | "member"
  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)
  chat   Chat   @relation(fields: [chatId], references: [id], onDelete: Cascade)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

Chat example:
[
    {
        "id": "cm74idbrl000ea19e2x67mjsp",
        "type": "private",
        "name": null,
        "image": null,
        "createdAt": "2025-02-14T08:30:06.033Z",
        "updatedAt": "2025-02-14T08:30:06.033Z",
        "users": [
            {
                "id": "cm74idbsd000fa19e9s6grvsf",
                "userId": "cm74icql80009a19ed2i7egub",
                "chatId": "cm74idbrl000ea19e2x67mjsp",
                "role": "admin",
                "createdAt": "2025-02-14T08:30:06.062Z",
                "updatedAt": "2025-02-14T08:30:06.062Z"
            },
            {
                "id": "cm74idbsd000ga19ewlnapmw5",
                "userId": "cm74ic6ph0008a19elyh3wus5",
                "chatId": "cm74idbrl000ea19e2x67mjsp",
                "role": "admin",
                "createdAt": "2025-02-14T08:30:06.062Z",
                "updatedAt": "2025-02-14T08:30:06.062Z"
            }
        ]
    }
]
*/

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
  type: "private" | "group";
  name: string | null;
  image: string | null;
  createdAt: string;
  updatedAt: string;
  users: {
    id: string;
    userId: string;
    chatId: string;
    role: "admin" | "member";
    user: UserType;
    chat: ChatType;
    createdAt: string;
    updatedAt: string;
  }[];
};

export type ChatsType = ChatType[];