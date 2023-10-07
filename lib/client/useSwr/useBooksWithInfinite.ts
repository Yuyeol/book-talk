import useSWRInfinite from "swr/infinite";
import fetcher from "@/lib/client/fetcher";
import { IBooksResponse } from "@/types";
function useBooksWithInfinite(userId?: string) {
  const getKey = (pageIndex: number, previousPageData: IBooksResponse) => {
    if (previousPageData?.books.length === 0) return null;
    return `/api/books?userId=${userId}&page=${pageIndex}&limit=2`;
  };
  const { data, error, isLoading, mutate, size, setSize } =
    useSWRInfinite<IBooksResponse>(getKey, fetcher);
  return {
    data,
    isLoading,
    isError: error,
    mutate,
    size,
    setSize,
  };
}

export default useBooksWithInfinite;
