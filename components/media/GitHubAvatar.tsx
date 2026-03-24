"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";

interface GithubAvatarProps {
    src?: string;
    altText?: string;
    width?: number;
    height?: number;
}

export default function GithubAvatar({ 
    src,
    altText = "User avatar",
    width = 80,
    height = 80
}: GithubAvatarProps) {
    const { data: session } = useSession();
    const isAuthenticated = !!session;

    return isAuthenticated && (
        <Image
            src={src ?? session.user?.image ?? ""}
            alt={altText ?? session.user?.name ?? "User avatar"}
            className="
                border-2 border-solid border-white
                w-10 lg:w-20
                h-10 lg:h-20
                rounded-full
                lg:mb-3
                mr-3 lg:mr-0
            "
            width={width}
            height={height}
        />
    );
}
