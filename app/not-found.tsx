import CustomLink from "@/components/interactions/CustomLink";

export default function NotFound() {
  return (
    <div className="max-w-5xl mx-auto p-6 text-center min-h-[550]">
      <h1 className="text-3xl font-bold mt-[100]">404 - Movie Not Found</h1>
      <p className="mt-4">The movie you are looking for does not exist.</p>
      <CustomLink href="/" className="mt-6" type="button">
        &larr; Back to Home
      </CustomLink>
    </div>
  );
}
