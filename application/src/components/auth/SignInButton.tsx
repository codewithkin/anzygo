"use client";
import { Button } from "@/components/ui/button"
import { useFormStatus } from "react-dom"
import { Loader } from "lucide-react";

export function SignInButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant="default"
      size="lg"
      disabled={pending}
      className="flex gap-2 items-center"
    >
      {pending ? (
        <div className="flex items-center gap-2">
          <Loader className="animate-spin" size={20} />
          <span>Signing you in...</span>
        </div>
      ) : (
        <span>Sign in | Sign up</span>
      )}
    </Button>
  )
}
