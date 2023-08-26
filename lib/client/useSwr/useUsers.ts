import useSWR from "swr";
import fetcher from "@/lib/client/fetcher";
import { IUsersResponse } from "@/types";

function useUsers() {
  const url = "/api/users";
  const { data, mutate, error, isLoading } = useSWR<IUsersResponse>(
    url,
    fetcher
  );

  return {
    data,
    mutate,
    isLoading,
    isError: error,
  };
}

export default useUsers;
