import Plus from "@/components/icon/plus";
import Link from "next/link";
import {
  HEADER_ICON_WIDTH,
  HEADER_ICON_COLOR,
  PRIMARY_GREEN,
} from "@/constants";
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
import Book from "@/components/icon/book";
import BlankNotice from "@/components/blank-notice";
import Button from "@/components/blank-notice/button";
import { useRouter } from "next/router";

const Home = () => {
  const { data: session } = useSession();
  const { data } = useBooks(session?.user?.id);
  const router = useRouter();

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
        <>
          {data.books.length === 0 ? (
            <BlankNotice
              icon={<Book width={6} color={PRIMARY_GREEN} />}
              mainDescription={"등록된 책이 없습니다."}
              subDescription={
                <>
                  읽고있는 책을 등록하여
                  <br />
                  나만의 기록을 남겨보세요.
                </>
              }
              button={
                <Button
                  text="등록하기"
                  onClick={() => {
                    router.push("/books/upload");
                  }}
                />
              }
            />
          ) : (
            <ul className="p-4 space-y-4">
              {data.books.map((book: IBookWithTags) => (
                <Item key={book.id} book={book} />
              ))}
            </ul>
          )}
        </>
      ) : (
        <SpinnerWrapper type="screen-center">
          <Spinner />
        </SpinnerWrapper>
      )}
    </>
  );
};

export default Home;
