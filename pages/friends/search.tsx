import Layout from "@/components/layout";
import { useCallback, useState } from "react";
import useSWR from "swr";
import _ from "lodash";
import Form from "@/components/search/form";
import Tab from "@/components/search/tab";
import Item from "@/components/search/friends/item";
import { useSession } from "next-auth/react";
import useMutation from "@/lib/client/useMutation";
import fetcher from "@/lib/client/fetcher";
import { IUserWithFriends } from "@/types";

const Search = () => {
  const { data: session } = useSession();
  const { data } = useSWR<{
    ok: boolean;
    users: IUserWithFriends[];
  }>("/api/users", fetcher);
  const [currentTab, setCurrentTab] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState<IUserWithFriends[]>([]);
  const { mutation: mutationAddFriend, loading: loadingAddFriend } =
    useMutation(`/api/users/${session?.user?.id}/friends/add`);
  const { mutation: mutationRemoveFriend, loading: loadingRemoveFriend } =
    useMutation(`/api/users/${session?.user?.id}/friends/delete`);

  const addFriend = (id: string) => {
    if (loadingAddFriend) return;
    mutationAddFriend({ friendId: id }, "POST");
  };
  const removeFriend = (id: string) => {
    if (loadingRemoveFriend) return;
    mutationRemoveFriend({ friendId: id }, "POST");
  };

  const selectTab = useCallback((index: number) => {
    setCurrentTab(index);
    resetSearch();
  }, []);
  const resetSearch = () => {
    setSearchValue("");
    setSearchResults([]);
  };

  const filterUsers = useCallback(
    (search: string) => {
      if (!search || !data?.users) return [];
      return data.users.filter((user) => {
        if (user.id === session?.user?.id) return;
        if (currentTab === 0) return user.name?.includes(search);
        if (currentTab === 1) return user.email?.includes(search);
      });
    },
    [currentTab, data?.users, session?.user?.id]
  );

  const setResultsWithDebounce = _.debounce(
    useCallback(
      (value: string) => {
        setSearchResults(filterUsers(value));
      },
      [filterUsers]
    ),
    200
  );
  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.target.value);
      setResultsWithDebounce(e.target.value);
    },
    [setResultsWithDebounce]
  );
  return (
    <Layout>
      <div className="p-4">
        <Form
          handleSearch={handleSearch}
          searchValue={searchValue}
          resetSearch={resetSearch}
        />
        <Tab
          selectTab={selectTab}
          currentTab={currentTab}
          tabs={["닉네임", "이메일"]}
        />
        <div className="divide-y-2">
          {searchResults.map((result) => {
            const myFriends = data?.users.find(
              (user) => user.id === session?.user?.id
            )?.friendsTo;
            const isFriend = !!myFriends?.find(
              (myFriend) => myFriend.id === result.id
            );
            return (
              <Item
                key={result.id}
                user={result}
                isFriend={isFriend}
                onClickFriend={isFriend ? removeFriend : addFriend}
              />
            );
          })}
        </div>
      </div>
    </Layout>
  );
};
export default Search;
