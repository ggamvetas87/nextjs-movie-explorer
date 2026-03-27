import Homepage from "@/pageComponents/Homepage";

type Props = {
  searchParams: Promise<{
    query?: string;
    page?: string;
  }>;
};

export default async function Page({ searchParams }: Props) {
  const { query, page } = await searchParams;
  const initialQuery = query || "";
  const initialPage = Number(page || 1);

  return (
    <Homepage
      initialQuery={initialQuery}
      initialPage={initialPage}
    />
  );
}
