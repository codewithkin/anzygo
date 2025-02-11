"use client";

import { useRouter } from "next/navigation";
import { ChangeEventHandler, FormEvent, useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@heroui/input";
import { Loader2, PlusCircle, Search, SendHorizonal } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import getData from "@/helpers/queries/getData";
import { Avatar } from "@heroui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NewChatModal() {
  const [open, setOpen] = useState<boolean>(true);

  const router = useRouter();

  const [users, setUsers] = useState<null | any>(null);

  // Close modal when clicking outside or pressing Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        router.back();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [router]);

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
    <Dialog onOpenChange={() => router.back()} open={open}>
      <DialogContent>
        <DialogTitle>Start a new chat</DialogTitle>
        <DialogHeader className="mb-4">
          <form
            className="flex w-full justify-between items-center"
            onSubmit={(e) => {
              e.preventDefault();
              searchForUser(e.target[0].value);
            }}
          >
            <Input
              startContent={
                <Search className="text-primary" size={20} strokeWidth={1} />
              }
              className=""
              classNames={{
                input: "placeholder:font-regular",
              }}
              placeholder="Search for someone..."
            />

            <Button
              type="submit"
              className="bg-primary hover:bg-slate-800 text-white"
            >
              <Search size={20} />
            </Button>
          </form>
        </DialogHeader>

        <article className="flex flex-col gap-4">
          {users ? (
            <article className="flex flex-col gap-4">
              <Label>Public Users</Label>
              
              {users.map((user: any) => (
                <article
                  key={user.id}
                  className="w-full flex items-center justify-between"
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
                      <p className="text-primary text-regular text-xs">
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

                      setOpen(false)
                    }}
                    className="rounded-full hover:bg-slate-800 text-white"
                  >
                    <PlusCircle size={40} strokeWidth={2} />
                  </Button>
                </article>
              ))}
            </article>
          ) : data?.data ? (
            <article className="flex flex-col gap-4">
              <Label>Public Users</Label>
              {data?.data?.map((user: any) => (
                <article
                  key={user.id}
                  className="w-full flex items-center justify-between"
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
                      <p className="text-primary text-regular text-xs">
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

                      setOpen(false)
                    }}
                    className="rounded-full hover:bg-slate-800 text-white"
                  >
                    <PlusCircle size={40} strokeWidth={2} />
                  </Button>
                </article>
              ))}
            </article>
          ) : (
            <article className="w-full h-full flex flex-col justify-center items-center">
              <Loader2 size={30} className="animate-spin text-primary" />
            </article>
          )}
        </article>
      </DialogContent>
    </Dialog>
  );
}
