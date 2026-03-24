"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Button from "@/components/interactions/Button";

export default function GithubButton() {
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
        <Button
            onClick={!isAuthenticated ? handleLogin : () => signOut()}>
            {isLoading ? "Loading..." : loginButtonText}
        </Button>
    );
}
