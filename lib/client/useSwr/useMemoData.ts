import useSWR from "swr";
import fetcher from "@/lib/client/fetcher";
import { IMemoResponse } from "@/types";

function useMemoData(memoId: number) {
  const url = memoId ? `/api/memos/${memoId}` : null;
  const { data, error, isLoading } = useSWR<IMemoResponse>(url, fetcher);

  return {
    data,
    isLoading,
    isError: error,
  };
}

export default useMemoData;
