import useSWRInfinite from "swr/infinite";
import fetcher from "@/lib/client/fetcher";
import { IBooksResponse } from "@/types";
import { BOOKS_PER_PAGE } from "@/pages";
function useBooksWithInfinite(userId?: string) {
  const getKey = (pageIndex: number) => {
    return `/api/books?userId=${userId}&page=${pageIndex}&limit=${BOOKS_PER_PAGE}`;
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
