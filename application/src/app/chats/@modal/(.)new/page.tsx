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
  useQuery
} from "@tanstack/react-query"
import getData from "@/helpers/queries/getData";

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
    queryFn: async () => await getData(`/api/community/users`)
  })

  console.log("Public users: ", data)

  return (
      <Dialog onOpenChange={() => router.back()} open={true}>
        <DialogContent>
          <DialogTitle>Start a new chat</DialogTitle>
          <DialogHeader>
            <Input
              startContent={<Search className="text-primary" size={20} strokeWidth={1} />}
              className=""
              classNames={{
                input: "placeholder:font-regular"
              }}
              placeholder="Search for someone..."
            />
          </DialogHeader>

          <article className="flex flex-col gap-2">
            <Label>Public Users</Label>
            
            <article className="flex flex-col gap-2">
            </article>
          </article>
        </DialogContent>
      </Dialog>
  );
}
