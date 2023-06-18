import useSWR from "swr";
import fetcher from "@/lib/client/fetcher";
import { IBookResponse } from "@/types";

function useBook(bookId: number) {
  const url = bookId ? `/api/books/${bookId}` : null;
  const { data, error, isLoading, mutate } = useSWR<IBookResponse>(
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

export default useBook;
