import Homepage from "@/pageComponents/Homepage";

type Props = {
  searchParams: Promise<{
    query?: string;
    page?: string;
  }>;
};

export default async function Page({ searchParams }: Props) {
  const { query: queryParam, page: pageParam } = await searchParams;
  const query = queryParam ?? "";
  const page = Number(pageParam ?? 1);

  return (
    <Homepage
      initialQuery={query}
      initialPage={page}
    />
  );
}
