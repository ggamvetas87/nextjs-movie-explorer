"use client";

import Image from "next/image";
import ReactPlayer from 'react-player';

interface VideoPlayerProps {
  url: string; // e.g., YouTube or Vimeo link
  title?: string; // Optional title for the video
  thumbnaillUrl?: string; // Optional thumbnail for the video
}

export default function VideoPlayer({ url, title, thumbnaillUrl }: VideoPlayerProps) {
    const previewImage = thumbnaillUrl && <Image src={"https://placehold.co/600x400/png"} alt={title || "Video thumbnail"} className="w-full h-auto" />;

    return (
        <div className="w-full max-w-3xl mx-auto">
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