import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold">404 - Movie Not Found</h1>
      <p className="mt-4">The movie you are looking for does not exist.</p>
      <Link href="/" className="mt-6 inline-block bg-red-500 text-white px-4 py-2 rounded">
        &larr; Back to search
      </Link>
    </div>
  );
}
