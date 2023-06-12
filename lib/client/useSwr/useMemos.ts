import useSWR from "swr";
import fetcher from "@/lib/client/fetcher";
import { IMemosResponse } from "@/types";

function useMemos(bookId?: number) {
  const url = bookId ? `/api/memos?bookId=${bookId}` : "/api/memos";
  const { data, error, isLoading } = useSWR<IMemosResponse>(url, fetcher);

  return {
    data,
    isLoading,
    isError: error,
  };
}

export default useMemos;
