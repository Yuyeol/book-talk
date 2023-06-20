import useSWR from "swr";
import fetcher from "@/lib/client/fetcher";
import { ILikesResponse } from "@/types";

function useLikes(memoId?: number) {
  const url = memoId ? `/api/likes?memoId=${memoId}` : null;
  const { data, error, isLoading, mutate } = useSWR<ILikesResponse>(
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

export default useLikes;
