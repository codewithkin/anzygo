"use client";

import LeftBar from "@/components/chat/LeftBar";
import Page from "@/components/chat/Page";
import ChatInfo from "@/components/chat/ChatInfo";
import { getUser } from "@/lib/actions";
import Content from "../layouts/Content";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { createChat } from "@/helpers/queries/createChat";

export default function Chats() {
  const [selectedChat, setSelectedChat] = useState(null);
  const { data, isPending } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  console.log("DATA: ", data);

  // Get the user's chats
  const chats: any | null = data?.data?.chats || [];

  // Get the user id from query params
  const params = useSearchParams();

  const id = params.get("id") || "";

  // Make a request to the create new chat endpoint
  const mutation = useMutation({
    mutationFn: async () => await createChat(id),
    onSuccess: (data) => {
      console.log("Data returned when trying to create chat: ", data);
    },
    onError: (error) => {
      console.log("Error while creating chat: ", error);
    }
  })

   // Trigger mutation only when `id` changes
   useEffect(() => {
    if (id) {
      mutation.mutate();
    }
  }, [id]); 


  return (
    <Content>
      {/* Chats list, selectedChat page + Chat details */}
      <article className="flex gap-4 items-center w-full h-full">
        {/* Chats list, selectedChat page */}
        <article className="rounded-xl bg-white p-4 min-w-[400px] w-full h-full flex gap-8 items-center">
          {/* Searchbar and chat list */}
          <LeftBar chats={chats} />

          {/* Chat Page */}
          <Page chat={selectedChat} />
        </article>

        {/* Chats details */}
        <ChatInfo chat={selectedChat} />
      </article>
    </Content>
  );
}

export const dynamic = "force-dynamic";
