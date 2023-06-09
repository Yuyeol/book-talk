import useSWR from "swr";
import fetcher from "@/lib/client/fetcher";
import { IUsersResponse } from "@/types";

function useUsers() {
  const url = "/api/users";
  const { data, error, isLoading } = useSWR<IUsersResponse>(url, fetcher);

  return {
    data,
    isLoading,
    isError: error,
  };
}

export default useUsers;
