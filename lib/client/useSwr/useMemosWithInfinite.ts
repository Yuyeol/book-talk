import fetcher from "@/lib/client/fetcher";
import { MEMOS_PER_PAGE } from "@/pages/social";
import { IMemosResponse } from "@/types";
import useSWRInfinite from "swr/infinite";

const getKey = (pageIndex: number) => {
  return `/api/memos?page=${pageIndex}&limit=${MEMOS_PER_PAGE}`;
};
function useMemosWithInfinite() {
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
