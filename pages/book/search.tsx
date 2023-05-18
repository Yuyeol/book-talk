import Layout from "@/components/layout";
import { useCallback, useState } from "react";
import useSWR from "swr";
import { IBookResponse, IBookWithTags } from "@/pages/index";
import _ from "lodash";
import XMark from "@/components/icon/x-mark";

const TAB_DEFAULT_TEXT_COLOR = "black";
const TAB_ACTIVE_TEXT_COLOR = "white";
const TAB_DEFAULT_BG_COLOR = "white";
const TAB_ACTIVE_BG_COLOR = "black";

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
  // TODO: style을 위한 core compoent는 모두 globals.css의 커스텀클래스로 빼버리자.
  // 그리고 검색에 아이템 클릭하면 해당 디테일로 갈 수 있게 해주자.

  return (
    <Layout>
      <div className="p-4">
        <div className="relative">
          <input
            onChange={handleSearchInput}
            className="c_input pr-8"
            placeholder="Search"
          />
          <div className="top-1/2 right-2 bg-slate-400 absolute flex items-center justify-center w-4 h-4 -translate-y-1/2 rounded-full">
            <XMark width={0.75} color="white" />
          </div>
        </div>
        <div className="flex gap-2">
          {["제목", "저자", "태그"].map((item, i) => (
            <button
              className="w-14 border-white rounded-full"
              key={i}
              onClick={() => selectTab(i)}
              style={{
                color:
                  currentTab === i
                    ? TAB_ACTIVE_TEXT_COLOR
                    : TAB_DEFAULT_TEXT_COLOR,
                background:
                  currentTab === i ? TAB_ACTIVE_BG_COLOR : TAB_DEFAULT_BG_COLOR,
              }}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="divide-y-2">
          {searchResults.map((result) => (
            <div key={result.id}>{result.title}</div>
          ))}
        </div>
      </div>
    </Layout>
  );
};
export default Search;
