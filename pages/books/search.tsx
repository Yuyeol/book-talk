import { useCallback, useState } from "react";
import _ from "lodash";
import Form from "@/components/search/form";
import Item from "@/components/search/books/item";
import Tab from "@/components/search/tab";
import { IBookWithTags } from "@/types";
import useBooks from "@/lib/client/useSwr/useBooks";
import { useSession } from "next-auth/react";
import Header from "@/components/header";
import TitleCol from "@/components/header/title-col";

const Search = () => {
  const { data: session } = useSession();
  const { data } = useBooks(session?.user?.id);
  const [currentTab, setCurrentTab] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState<IBookWithTags[]>([]);
  const selectTab = useCallback((index: number) => {
    setCurrentTab(index);
    resetSearch();
  }, []);
  const resetSearch = () => {
    setSearchValue("");
    setSearchResults([]);
  };
  const filterBooks = useCallback(
    (search: string) => {
      if (!search || !data?.books) return [];
      return data.books.filter((book) => {
        if (currentTab === 0) return book.title.includes(search);
        if (currentTab === 1) return book.author?.includes(search);
        if (currentTab === 2)
          return book.tags.some((tag) => tag.name.includes(search));
      });
    },
    [currentTab, data?.books]
  );

  const setResultsWithDebounce = _.debounce(
    useCallback(
      (value: string) => {
        setSearchResults(filterBooks(value));
      },
      [filterBooks]
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
    <>
      <Header col1={<TitleCol>내 책 찾기</TitleCol>} />
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
            tabs={["제목", "저자", "태그"]}
          />
          <div className="divide-y-2 divide-primary-green/30 mt-4">
            {searchResults.map((result) => (
              <Item key={result.id} book={result} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default Search;
