import { SignInButton } from "@/components/auth/SignInButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function SignIn() {
  return (
    <div className="grid md:grid-cols-2 min-h-screen">
        {/* Left Content */}
        <article className="flex flex-col gap-8 md:gap-12 py-16 md:px-16 justify-center px-4">
            {/* Logo and Title */}
            <article className="flex gap-4 items-center">
                <Image 
                    src="/images/brand/icon.png" 
                    alt="Anzygo logo" 
                    width={32} 
                    height={32} 
                />

                <h2 className="text-primary font-semibold">Anzygo</h2>
            </article>

            {/* Heading and paragraph */}
            <article className="grid gap-2">
                <h2 className="font-semibold text-2xl">Let's get you signed in</h2>
                <p className="text-sm text-gray-500 font-light">Please sign in or sign up to continue</p>
            </article>

            {/* form */}
            <form 
            className="flex flex-col gap-4"
            action={async () => {
                "use server"
                console.log('helllo, earth !')
            }}>
                {/* Email field */}
                <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                />

                {/* Sign in button */}
                <SignInButton />
            </form>
        </article>

        {/* Right Content */}
        <article></article>
    </div>
  );
}
