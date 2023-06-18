import Item from "@/components/book/item";
import Plus from "@/components/icon/plus";
import Link from "next/link";
import {
  HEADER_ICON_WIDTH,
  HEADER_ICON_COLOR,
  HEADER_HEIGHT,
  NAVBAR_HEIGHT,
} from "@/constants";
import Search from "@/components/icon/search";
import Filter from "@/components/icon/filter";
import ToolsCol from "@/components/header/tools-col";
import TitleCol from "@/components/header/title-col";
import Header from "@/components/header";
import { useSession } from "next-auth/react";
import useBooks from "@/lib/client/useSwr/useBooks";
import { IBookWithTags } from "@/types";
import Spinner from "@/components/icon/spinner";

const Home = () => {
  const { data: session } = useSession();
  const { data } = useBooks(session?.user?.id);
  return (
    <>
      <Header
        col1={<TitleCol>Book</TitleCol>}
        col2={
          <ToolsCol>
            <Link href="/books/upload">
              <Plus width={HEADER_ICON_WIDTH} color={HEADER_ICON_COLOR} />
            </Link>
            <Link href="/books/search">
              <Search width={HEADER_ICON_WIDTH} color={HEADER_ICON_COLOR} />
            </Link>
            <button>
              <Filter width={HEADER_ICON_WIDTH} color={HEADER_ICON_COLOR} />
            </button>
          </ToolsCol>
        }
      />
      {data ? (
        <ul className="divide-y-2">
          {data.books.map((book: IBookWithTags) => (
            <Item key={book.id} book={book} />
          ))}
        </ul>
      ) : (
        <div
          className="absolute w-full h-screen flex justify-center items-center"
          style={{
            transform: `translateY(-${HEADER_HEIGHT + NAVBAR_HEIGHT}rem)`,
          }}
        >
          <Spinner />
        </div>
      )}
    </>
  );
};

export default Home;
