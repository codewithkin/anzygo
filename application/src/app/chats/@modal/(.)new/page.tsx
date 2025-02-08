"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@heroui/input";
import { Search } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import getData from "@/helpers/queries/getData";
import { Avatar } from "@heroui/avatar";

export default function NewChatModal() {
  const router = useRouter();

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

  console.log("Public users: ", data?.data);

  return (
    <Dialog onOpenChange={() => router.back()} open={true}>
      <DialogContent>
        <DialogTitle>Start a new chat</DialogTitle>
        <DialogHeader className="mb-4">
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
        </DialogHeader>

        <article className="flex flex-col gap-2">
          <Label>Public Users</Label>

          <article className="flex flex-col gap-2">
            {data?.data ? (
              data?.data?.map((user: any) => (
                <article key={user.id} className="flex gap-2 items-center">
                  <Avatar
                    className="w-12 h-12 text-sm"
                    showFallback
                    isBordered
                    color="default"
                    name={user.name}
                    src={user.profilePicture}
                  />
                  <article>
                    <h3 className="text-md font-medium">{user.name}</h3>
                    <p className="text-primary text-regular text-xs">
                      {user.email}
                    </p>
                  </article>
                </article>
              ))
            ) : (
              <h2 className="text-slate-400">These MFs private AF</h2>
            )}
          </article>
        </article>
      </DialogContent>
    </Dialog>
  );
}
