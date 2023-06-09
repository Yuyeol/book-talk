import useSWR from "swr";
import fetcher from "@/lib/client/fetcher";
import { ITagResponse } from "@/types";

function useTag(tagId: number) {
  const url = tagId ? `/api/tags/${tagId}` : null;
  const { data, error, isLoading } = useSWR<ITagResponse>(url, fetcher);

  return {
    data,
    isLoading,
    isError: error,
  };
}

export default useTag;
