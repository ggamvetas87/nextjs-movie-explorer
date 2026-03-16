import { Metadata } from 'next';
import Link from "next/link";
import Image from "next/image";
import { getMovie } from "@/lib/api";

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
      <Link href="/" className="text-blue-500 mb-4 inline-block">
        &larr; Back to search
      </Link>

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
        </div>
      </div>
    </>
  );
}
