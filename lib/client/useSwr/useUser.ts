import useSWR from "swr";
import fetcher from "@/lib/client/fetcher";
import { IUserResponse } from "@/types";

function useUser(userId: string) {
  const url = userId ? `/api/users/${userId}` : null;
  const { data, error, isLoading, mutate } = useSWR<IUserResponse>(
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

export default useUser;
