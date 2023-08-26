import { useCallback, useEffect, useState } from "react";
import _ from "lodash";
import Form from "@/components/search/form";
import Tab from "@/components/search/tab";
import Item from "@/components/search/friends/item";
import { useSession } from "next-auth/react";
import useMutation from "@/lib/client/useMutation";
import { IUserWithRelations } from "@/types";
import useUsers from "@/lib/client/useSwr/useUsers";
import Header from "@/components/header";
import TitleCol from "@/components/header/title-col";
import useUser from "@/lib/client/useSwr/useUser";
import { useRouter } from "next/router";
import Seo from "@/components/Seo";

const TITLE = "친구 찾기";

const Search = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { data } = useUsers();
  const { mutate } = useUser(session?.user?.id as string);

  const [currentTab, setCurrentTab] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState<IUserWithRelations[]>([]);
  const {
    data: friendResData,
    mutation: mutationFriend,
    loading: loadingFriend,
  } = useMutation(`/api/users/${session?.user?.id}/friends`);

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

  const addFriend = (id: string) => {
    if (loadingFriend) return;
    mutationFriend({ friendId: id, action: "add" }, "POST");
  };
  const removeFriend = (id: string) => {
    if (loadingFriend) return;
    mutationFriend({ friendId: id, action: "remove" }, "POST");
  };
  useEffect(() => {
    if (friendResData) {
      mutate();
      router.back();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [friendResData]);
  return (
    <>
      <Seo title={TITLE} />
      <Header col1={<TitleCol hasBackBtn>{TITLE}</TitleCol>} />
      <div className="p-4">
        <div className="bg-soft-white p-4 clear-left rounded-xl border-2 border-primary-green">
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
          <div className="divide-y-2 divide-primary-green/30 mt-4">
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
      </div>
    </>
  );
};
export default Search;
