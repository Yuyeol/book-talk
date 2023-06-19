import useSWR from "swr";
import fetcher from "@/lib/client/fetcher";
import { IBooksResponse } from "@/types";

function useBooks(userId?: string) {
  const url = userId ? `/api/books?userId=${userId}` : null;
  const { data, error, isLoading, mutate } = useSWR<IBooksResponse>(
    url,
    fetcher
  );
  return {
    data,
    isLoading,
    isError: error,
    mutate,
  };
}

export default useBooks;
