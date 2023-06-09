import useSWR from "swr";
import fetcher from "@/lib/client/fetcher";
import { IMemoResponse } from "@/types";

function useMemoData(bookId: number, memoId: number) {
  const url = bookId ? `/api/books/${bookId}/memos/${memoId}` : null;
  const { data, error, isLoading } = useSWR<IMemoResponse>(url, fetcher);

  return {
    data,
    isLoading,
    isError: error,
  };
}

export default useMemoData;
