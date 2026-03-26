"use client"

import CustomLink from "@/components/interactions/CustomLink";

type Props = {
  currentPage: number
  totalResults: number
  slug: string
}

const PAGE_SIZE = 20

export default function Pagination({
  currentPage,
  totalResults,
  slug
}: Props) {

  const totalPages = Math.ceil(totalResults / PAGE_SIZE);

  const start = (currentPage - 1) * PAGE_SIZE + 1;
  const end = Math.min(currentPage * PAGE_SIZE, totalResults);

  return (
    <div className="flex flex-col md:flex-row lg:flex-row items-center justify-between gap-4">

      <div className="text-sm text-gray-300">
        Showing <strong>{start}-{end}</strong> of{" "}
        <strong>{totalResults}</strong> results
        {" "} (Page <strong>{currentPage}</strong> of{" "}
        <strong>{totalPages}</strong>)
      </div>

      <div className="flex gap-4">

        {currentPage > 1 && (
          <CustomLink
            href={`/movie/category/${slug}?page=${currentPage - 1}`}
            className="px-4 py-2 border rounded"
          >
            ← Previous
          </CustomLink>
        )}

        {currentPage < totalPages && (
          <CustomLink
            href={`/movie/category/${slug}?page=${currentPage + 1}`}
            className="px-4 py-2 border rounded"
          >
            Next →
          </CustomLink>
        )}

      </div>

    </div>
  )
}
