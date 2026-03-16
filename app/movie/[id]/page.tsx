import { Metadata } from 'next';
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { getMovie } from "@/lib/api";
import VideoPlayer from "@/components/media/VideoPlayer";

// const VideoPlayer = dynamic(() => import("@/components/media/VideoPlayer"), {
//   ssr: false
// });

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { id } = await params;
  const data = await getMovie(id);
  const movie = data.short;

  return {
    title: movie.name,
    description: movie.description,
  };
}

export default async function MoviePage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const data = await getMovie(id);
  const movie = data.short;

  return (
    <>
      <div className="max-w-5xl mx-auto p-6 flex flex-col md:flex-row gap-6">
        <Link href="/" className="mt-4 inline-block bg-red-500 text-white px-4 py-2 rounded">
          &larr; Back to search
        </Link>
      </div>

      <div className="max-w-3xl mx-auto p-6 flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2">
          <Image 
            src={movie["image"]}
            alt={movie["name"]} 
            className="mb-4"
            width={300}
            height={600}
          />
        </div>

        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold">{movie["name"]}</h1>
          <p className="mt-2">{movie["contentRating"]}</p>
          <p className="mt-4">{movie["description"]}</p>
          <p>
            <Link target="_blank" href={movie["url"]} className="mt-4 inline-block bg-red-500 text-white px-4 py-2 rounded">
              More details &rarr;
            </Link>
          </p>
        </div>
      </div>

      {movie.trailer?.url && (
        <div className="max-w-3xl mx-auto p-6 gap-6">
          <>
            <h4 className="text-2xl font-bold mb-4 text-center">
              {movie.trailer.name}
            </h4>
            <p className="mb-4 text-center">
              {movie.trailer.description}
            </p>
          </>
          <VideoPlayer 
            url={movie.trailer.url}
            title={movie.trailer.name}
            thumbnaillUrl={movie.trailer.thumbnaillUrl}
          />
        </div>
      )}
    </>
  );
}
