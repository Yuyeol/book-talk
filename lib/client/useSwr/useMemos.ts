import useSWR from "swr";
import fetcher from "@/lib/client/fetcher";
import { IMemosResponse } from "@/types";

function useMemos(
  bookId: number | null,
  { fetchAll }: { fetchAll: boolean } = { fetchAll: false }
) {
  const url = fetchAll
    ? "/api/memos"
    : bookId
    ? `/api/memos?bookId=${bookId}`
    : null;
  const { data, error, isLoading } = useSWR<IMemosResponse>(url, fetcher);
  return {
    data,
    isLoading,
    isError: error,
  };
}

export default useMemos;
