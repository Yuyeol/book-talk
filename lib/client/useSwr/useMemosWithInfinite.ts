import fetcher from "@/lib/client/fetcher";
import { IMemosResponse } from "@/types";
import useSWRInfinite from "swr/infinite";

function useMemosWithInfinite() {
  const getKey = (pageIndex: number, previousPageData: IMemosResponse) => {
    if (previousPageData?.memos.length === 0) return null;
    return `/api/memos?page=${pageIndex}&limit=3`;
  };

  const { data, error, isLoading, mutate, size, setSize } =
    useSWRInfinite<IMemosResponse>(getKey, fetcher);
  return {
    data,
    isLoading,
    isError: error,
    mutate,
    size,
    setSize,
  };
}

export default useMemosWithInfinite;
