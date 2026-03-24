"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import Section from "@/components/grids/Section";
import Button from "@/components/interactions/Button";

export default function Header() {
  const { data: session, status } = useSession();

  const isLoading = status === "loading";
  const isAuthenticated = !!session;
  const loginButtonText = isAuthenticated ? "Sign out" : "Sign in with GitHub";

  const handleLogin = () => {
    signIn("github", {
      callbackUrl: window.location.href
    });
  };

  return (
    <Section
        className="mb-0"
        style={{ background: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/assets/popcorn-background.jpg) bottom center / cover no-repeat" }} 
    >
        <div className="
            max-w-5xl
            mx-auto
            p-2
            sm:p-4 md:p-6 lg:p-6
            flex
            flex-col
            md:flex-row
            gap-4
            sm:gap-4 md:gap-6 lg:gap-6
            items-center
            justify-between
        ">
          <Link href="/" className="flex items-center gap-4">
            <Image 
              src="/assets/popcornia-logo.jpg" 
              alt="Popcornia logo" 
              className="rounded-full"
              width={64} 
              height={64}
            />
            <div>
              <h1 className="text-4xl font-bold text-white text-shadow:_0_0_0.5px_black">Popcornia</h1>
              <h4 className="text-lg text-white text-shadow:_0_0_0.5px_black">Evokes popcorn and fun movie browsing</h4>
            </div>    
          </Link>
          <div className="
            flex 
            flex-row lg:flex-col xl:flex-col
            items-center
          ">
            {isAuthenticated && <Image
              src={session.user?.image ?? ""}
              alt={session.user?.name ?? ""}
              className="
                w-10 lg:w-20
                h-10 lg:h-20
                rounded-full
                lg:mb-3
                mr-3 lg:mr-0
              "
              width={80}
              height={80}
            />}
            <Button
              onClick={!isAuthenticated ? handleLogin : () => signOut()}>
                {isLoading ? "Loading..." : loginButtonText}
            </Button>
          </div>
        </div>
    </Section>
  );
}
