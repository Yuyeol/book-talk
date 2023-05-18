import Layout from "@/components/layout";
import { useCallback, useState } from "react";
import useSWR from "swr";
import { IBookResponse, IBookWithTags } from "@/pages/index";
import _ from "lodash";
import Form from "@/components/book/search/form";
import Item from "@/components/book/search/item";
import Tab from "@/components/book/search/tab";

const Search = () => {
  const { data } = useSWR<IBookResponse>("/api/book");
  const [currentTab, setCurrentTab] = useState(0);
  const [searchResults, setSearchResults] = useState<IBookWithTags[]>([]);
  const selectTab = useCallback((index: number) => setCurrentTab(index), []);
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

  const handleSearchInput = _.debounce(
    useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchResults(filterBooks(e.target.value));
      },
      [filterBooks]
    ),
    200
  );

  return (
    <Layout>
      <div className="p-4">
        <Form handleSearchInput={handleSearchInput} />
        <Tab selectTab={selectTab} currentTab={currentTab} />
        <div className="divide-y-2">
          {searchResults.map((result) => (
            <Item key={result.id} book={result} />
          ))}
        </div>
      </div>
    </Layout>
  );
};
export default Search;
