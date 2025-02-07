import LeftBar from "@/components/chat/LeftBar";
import Page from "@/components/chat/Page";
import ChatInfo from "@/components/chat/ChatInfo";
import { auth } from "@/auth";
import { getUser } from "@/lib/actions";

export default async function Chats() {
  const chats = [
    {
        id: 1,
        name: "John Doe",
        lastMessage: {
            content: "Hello, how are you?",
            time: new Date() - 2 * 60 * 1000 //5 minutes ago
        },
        active: true,
        profilePicture: "/images/kin.jpg"
    },
    {
     id: 2,
     name: "Jane Doe",
     lastMessage: {
         content: "Hey there Kin, you still up for tomorrow ?",
         time: new Date() - 20 * 60 * 1000 //20 minutes ago
     },
     profilePicture: "/images/ki.jpg"
     },
     {
         id: 3,
         name: "Bob Smith",
         lastMessage: {
             content: "You'll have it by Friday, Promise.",
             time: new Date() - 40 * 60 * 1000 //40 minutes ago
         },
         profilePicture: "/images/morty.jpeg"
     }
 ]

 const session = await auth();

 if(!session) return;

 const user = await getUser(session?.user?.email);

 console.log("User: ", user);

  return (
    <article className="flex h-full flex-col p-4 w-full">
      {/* Chats list, chat page + Chat details */}
      <article className="flex gap-4 items-center w-full h-full">
        {/* Chats list, chat page */}
        <article className="rounded-xl bg-white p-4 min-w-[400px] w-full h-full flex gap-8 items-center">
          {/* Searchbar and chat list */}
          <LeftBar chats={chats} />

          {/* Chat Page */}
          <Page />
        </article>

        {/* Chats details */}
        <ChatInfo />
      </article>
    </article>
  );
}