import useSWR from "swr";
import fetcher from "@/lib/client/fetcher";
import { IMemoResponse } from "@/types";

function useMemoData(memoId: number | undefined) {
  const url = memoId ? `/api/memos/${memoId}` : null;
  const { data, error, isLoading, mutate } = useSWR<IMemoResponse>(
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

export default useMemoData;
