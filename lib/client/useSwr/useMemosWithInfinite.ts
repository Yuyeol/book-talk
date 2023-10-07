import fetcher from "@/lib/client/fetcher";
import { IMemosResponse } from "@/types";
import useSWRInfinite from "swr/infinite";

const getKey = (pageIndex: number) => {
  return `/api/memos?page=${pageIndex}&limit=3`;
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
