"use client";

import { twMerge } from "tailwind-merge";
import Image from "next/image";
import ReactPlayer from 'react-player';

interface VideoPlayerProps {
  url: string; // e.g., YouTube or Vimeo link
  title?: string; // Optional title for the video
  thumbnaillUrl?: string; // Optional thumbnail for the video
  className?: string; // Optional additional CSS classes
}

export default function VideoPlayer({ 
    url,
    title,
    thumbnaillUrl,
    className
}: VideoPlayerProps) {
    const previewImage = thumbnaillUrl && <Image src={"https://placehold.co/600x400/png"} alt={title || "Video thumbnail"} className="w-full h-auto" />;

    return (
        <div className={twMerge("w-full mx-auto", className)}>
            <ReactPlayer
                playing={false}
                light={previewImage}
                controls
                width="100%"
                height="360px"
                src={url}
            />
        </div>
    );
}