import Plus from "@/components/icon/plus";
import Link from "next/link";
import { HEADER_ICON_WIDTH, HEADER_ICON_COLOR } from "@/constants";
import Search from "@/components/icon/search";
import ToolsCol from "@/components/header/tools-col";
import TitleCol from "@/components/header/title-col";
import Header from "@/components/header";
import { useSession } from "next-auth/react";
import useBooks from "@/lib/client/useSwr/useBooks";
import { IBookWithTags } from "@/types";
import Spinner from "@/components/icon/spinner";
import Item from "@/components/book/item";
import SpinnerWrapper from "@/components/icon/spinner-wrapper";

const Home = () => {
  const { data: session } = useSession();
  const { data } = useBooks(session?.user?.id);

  return (
    <>
      <Header
        col1={<TitleCol>독서중</TitleCol>}
        col2={
          <ToolsCol>
            <Link href="/books/upload">
              <Plus width={HEADER_ICON_WIDTH} color={HEADER_ICON_COLOR} />
            </Link>
            <Link href="/books/search">
              <Search width={HEADER_ICON_WIDTH} color={HEADER_ICON_COLOR} />
            </Link>
          </ToolsCol>
        }
      />
      {data ? (
        <ul className="p-4 space-y-4">
          {data.books.map((book: IBookWithTags) => (
            <Item key={book.id} book={book} />
          ))}
        </ul>
      ) : (
        <SpinnerWrapper type="screen-center">
          <Spinner />
        </SpinnerWrapper>
      )}
    </>
  );
};

export default Home;
