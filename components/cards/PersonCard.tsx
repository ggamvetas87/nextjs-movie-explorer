import Link from "next/link";
import Image from "next/image";
import { Person } from "@/types/thmdb";

export default function PersonCard({ data }: { data: Person }) {
  const imgUrl = `${data?.imgUrl ? `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/w200/${data.imgUrl}` : "/assets/no-image-placeholder.png"}`;

  return (
    <div className="relative w-[150px]">
      <Link href={`https://www.themoviedb.org/person/${data.id}`} target="_blank">
        <>
          {imgUrl && (
            <div className="p-3 hover:shadow group cursor-pointer w-[150px] h-[150px] overflow-hidden">
              <Image
                src={imgUrl}
                alt={data?.name}
                className="
                  w-[100%]
                  h-[100%]
                  object-cover
                  mb-2 
                  rounded-full
                  transition
                  duration-300
                  group-hover:scale-110
                "
                width={150}
                height={150}
              />
            </div>
          )}
          <div className="text-center mt-2">
            <h3 className="text-sm font-semibold hover:text-red-500">{data?.name}</h3>
            <p className="text-xs text-gray-500">{data?.role ?? data?.character}</p>
          </div>
        </>
      </Link>
    </div>
  );
}
