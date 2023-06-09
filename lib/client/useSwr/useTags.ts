import useSWR from "swr";
import fetcher from "@/lib/client/fetcher";
import { ITagsResponse } from "@/types";

function useTags(userId?: string) {
  const url = userId ? `/api/tags?userId=${userId}` : "/api/tags";
  const { data, error, isLoading } = useSWR<ITagsResponse>(url, fetcher);

  return {
    data,
    isLoading,
    isError: error,
  };
}

export default useTags;
