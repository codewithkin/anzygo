"use client";
import Content from "@/app/layouts/Content";
import WhiteContent from "@/app/layouts/WhiteContent";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import getData from "@/helpers/queries/getData";
import { Avatar } from "@heroui/avatar";
import { Input } from "@heroui/input";
import { useQuery } from "@tanstack/react-query";
import { Loader2, PlusCircle, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function page() {
  const [users, setUsers] = useState<null | any>(null);

  const router = useRouter();

  // Close modal when clicking outside or pressing Escape
  const { data } = useQuery({
    queryKey: ["publicUsers"],
    queryFn: async () => await getData(`/api/community/users`),
  });

  const searchForUser = (term: string) => {
    try {
      // Find a user with the search term
      const filteredUsers = data?.data.filter(
        (user: any) => user.name == term || user.email == term,
      );

      setUsers(filteredUsers);

      console.log("Users searched for: ", users);
    } catch (e) {
      console.log("Error while searching for user: ", e);
    }
  };

  return (
    <WhiteContent>
      <h2 className="text-xl">Start a new conversation</h2>

      {/* Searchbar */}
      <article className="my-4">
        <form
          className="flex w-fit items-center gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            searchForUser(e.target[0].value);
          }}
        >
          <Input
            startContent={
              <Search className="text-gray-600" size={20} strokeWidth={1} />
            }
            radius="sm"
            className="md:min-w-[600px] md:max-w-[600px] max-w-full min-w-full"
            classNames={{
              input: "placeholder:font-regular",
              inputWrapper: "bg-blue-200 hover:bg-slate-500",
            }}
            placeholder="Search for someone..."
          />

          <Button type="submit" className="bg-primary hover:bg-slate-500 py-4">
            <Search size={20} />
          </Button>
        </form>
      </article>

      {/* Public users */}
      <article className="flex flex-col gap-2">
        {/* Public users list */}
        <article className="grid md:grid-cols-3 lg:grid-cols-4 grid-rows-3 md:grid-rows-4">
          {users ? (
            <article className="flex flex-col gap-4">
              <Label className="text-white">Public Users</Label>

              {users.map((user: any) => (
                <article
                  key={user.id}
                  className="w-full items-center justify-between md:min-w-[300px] flex border border-slate-300 p-4 rounded-xl ransition hover:bg-slate-400 hover:border-0 hover:text-slate-700 hover:cursor-pointer transition duration-300"
                >
                  <article className="flex gap-4 items-center hover:cursor-pointer transition duration-300 hover:bg-slate-400 hover:border-0 hover:text-slate-800">
                    <Avatar
                      className="w-12 h-12 text-sm"
                      showFallback
                      isBordered
                      color="default"
                      name={user.name}
                      src={user.image}
                    />
                    <article>
                      <h3 className="text-md font-medium">{user.name}</h3>
                      <p className="text-gray-600 text-regular text-xs">
                        {user.email}
                      </p>
                    </article>
                  </article>

                  {/* Start a new chat btn */}
                  <Button
                    type="button"
                    onClick={() => {
                      // Redirect
                      router.push(`/chats/?id=${user.id}`);
                    }}
                    className="rounded-full hover:bg-slate-500 text-white"
                  >
                    <PlusCircle size={40} strokeWidth={2} />
                  </Button>
                </article>
              ))}
            </article>
          ) : data?.data ? (
            <article className="flex flex-col gap-4">
              <Label className="text-white">Public Users</Label>
              {data?.data?.map((user: any) => (
                <article
                  key={user.id}
                  className="w-full items-center justify-between md:min-w-[300px] flex border border-slate-300 p-4 rounded-xl ransition hover:bg-slate-400 hover:border-0 hover:text-slate-700 hover:cursor-pointer transition duration-300"
                >
                  <article className="flex gap-4 items-center">
                    <Avatar
                      className="w-12 h-12 text-sm"
                      showFallback
                      isBordered
                      color="default"
                      name={user.name}
                      src={user.image}
                    />
                    <article>
                      <h3 className="text-md font-medium">{user.name}</h3>
                      <p className="text-gray-600 text-regular text-xs">
                        {user.email}
                      </p>
                    </article>
                  </article>

                  {/* Start a new chat btn */}
                  <Button
                    type="button"
                    onClick={() => {
                      // Redirect
                      router.push(`/chats/?id=${user.id}`);
                    }}
                    className="rounded-full hover:bg-slate-500 text-white"
                  >
                    <PlusCircle size={40} strokeWidth={2} />
                  </Button>
                </article>
              ))}
            </article>
          ) : (
            <article className="w-full h-full flex flex-col justify-center items-center">
              <Loader2 size={30} className="animate-spin text-slate-500" />
            </article>
          )}
        </article>
      </article>
    </WhiteContent>
  );
}

export default page;
