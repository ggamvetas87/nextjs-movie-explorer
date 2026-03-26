"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useHideForRoutes } from "@/hooks/useHideForRoutes";
import Button from "@/components/interactions/Button";

export default function GithubButton({
    session
}: {
    session: ReturnType<typeof useSession>["data"];
}) {
    const hideAuthButtons = useHideForRoutes(["/access-denied"]);
    const { status } = useSession();

    const isLoading = status === "loading";
    const isAuthenticated = !!session;
    const loginButtonText = isAuthenticated ? "Sign out" : "Sign in with GitHub";

    const handleLogin = () => {
        signIn("github", {
            callbackUrl: window.location.href
        });
    };

    return !hideAuthButtons && (
        <Button
            onClick={!isAuthenticated ? handleLogin : () => signOut()}>
            {isLoading ? "Loading..." : loginButtonText}
        </Button>
    );
}
