import useSWR from "swr";
import fetcher from "@/lib/client/fetcher";
import { ICommentsResponse } from "@/types";

function useComments(memoId?: number) {
  const url = memoId ? `/api/comments?memoId=${memoId}` : "/api/memos";
  const { data, error, isLoading } = useSWR<ICommentsResponse>(url, fetcher);

  return {
    data,
    isLoading,
    isError: error,
  };
}

export default useComments;
