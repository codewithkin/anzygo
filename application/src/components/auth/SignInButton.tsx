"use client";
import { Button } from "@/components/ui/button"
import { useFormStatus } from "react-dom"

export function SignInButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant="default"
      size="lg"
      disabled={pending}
    >
      {pending ? (
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" fill="none" />
          </svg>
          <span>Signing you in...</span>
        </div>
      ) : (
        <span>Sign in | Sign up</span>
      )}
    </Button>
  )
}
