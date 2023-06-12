import useSWR from "swr";
import fetcher from "@/lib/client/fetcher";
import { IBooksResponse } from "@/types";

function useBooks(userId?: string) {
  const url = userId ? `/api/books?userId=${userId}` : "/api/books";
  const { data, error, isLoading } = useSWR<IBooksResponse>(url, fetcher);

  return {
    data,
    isLoading,
    isError: error,
  };
}

export default useBooks;
