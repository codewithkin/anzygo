"use client";
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
      console.log(term);

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
    <article className="flex flex-col gap-4 p-4 md:p-8">
      <h2 className="text-white text-xl">Start a new conversation</h2>

      {/* Searchbar */}
      <article className="mb-4">
        <form
          className="flex w-full justify-between items-center gap-2"
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
            className="md:min-w-[400px]"
            classNames={{
              input: "placeholder:font-regular",
            }}
            placeholder="Search for someone..."
          />

          <Button
            type="submit"
            className="bg-primary hover:bg-slate-500 text-white py-4"
          >
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
                  className="w-full items-center justify-between md:min-w-[300px] flex bg-white p-4 rounded-md"
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
          ) : data?.data ? (
            <article className="flex flex-col gap-4">
              <Label className="text-white">Public Users</Label>
              {data?.data?.map((user: any) => (
                <article
                  key={user.id}
                  className="w-full items-center justify-between md:min-w-[300px] flex bg-white p-4 rounded-md"
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
              <Loader2 size={30} className="animate-spin text-gray-200" />
            </article>
          )}
        </article>
      </article>
    </article>
  );
}

export default page;
