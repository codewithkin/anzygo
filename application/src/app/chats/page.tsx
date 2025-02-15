"use client";

import LeftBar from "@/components/chat/LeftBar";
import Page from "@/components/chat/Page";
import ChatInfo from "@/components/chat/ChatInfo";
import { getSpecificUser, getUser } from "@/lib/actions";
import Content from "../layouts/Content";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { createChat } from "@/helpers/queries/createChat";
import { useSelectedChatStore } from "@/stores/useSelectedChat";
import useQueryStore from "@/providers/CustomQueryClientProvider";
import { ChatsType, UserType } from "@/types";
import { useUserInfo } from "@/stores/useUserInfo";
import { useForeignUser } from "@/stores/useForeignUser";

export default function Chats() {
  // Fetch logged-in user data
  const { data, isPending } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  const setUserInfo = useUserInfo((state) => state.setUserInfo);
  const prevUserRef = useRef(null);

  // ✅ Update user info only when it changes
  useEffect(() => {
    if (data?.user && prevUserRef.current !== data.user) {
      setUserInfo(data.user);
      prevUserRef.current = data.user;
    }
  }, [data]);

  // Get the user's chats
  const chats: ChatsType = data?.chats || [];

  // Get the query client
  const queryClient = useQueryStore((state) => state.queryClient);

  const selectedChat = useSelectedChatStore((state) => state.selectedChat);
  const setSelectedChat = useSelectedChatStore(
    (state) => state.setSelectedChat,
  );

  // Foreign user state
  const setForeignUser = useForeignUser((state) => state.setForeignUser);

  // Identify the foreign user (opposite user)
  const foreignUserId = selectedChat?.chatUsers?.find(
    (user: UserType) => user.userId !== data?.user?.id,
  )?.id;

  // Fetch the foreign user only when `foreignUserId` exists
  const { data: foreignUserData } = useQuery({
    queryKey: ["foreignUser", foreignUserId],
    queryFn: async () => {
      if (foreignUserId) {
        return await getSpecificUser(foreignUserId);
      }
      return null;
    },
    enabled: !!foreignUserId, // ✅ Prevents unnecessary calls
  });

  // ✅ Update selected chat and foreign user when chats change
  useEffect(() => {
    if (chats.length > 0) {
      setSelectedChat(chats[0]);
    }
  }, [chats]);

  useEffect(() => {
    if (foreignUserData) {
      setForeignUser(foreignUserData);
    }
  }, [foreignUserData]);

  // Get the target user id from query params (for creating a new chat)
  const params = useSearchParams();
  const id = params.get("id") || "";

  // Handle chat creation
  const mutation = useMutation({
    mutationFn: async () => await createChat(id),
    onSuccess: (data) => {
      console.log("Data returned when trying to create chat: ", data);
      queryClient.invalidateQueries({ queryKey: ["user"] }); // Refresh user data
    },
    onError: (error) => {
      console.log("Error while creating chat: ", error);
    },
  });

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
