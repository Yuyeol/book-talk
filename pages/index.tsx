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
import { IBookWithTags } from "@/types";
import Spinner from "@/components/icon/spinner";
import Item from "@/components/book/item";
import SpinnerWrapper from "@/components/icon/spinner-wrapper";
import Book from "@/components/icon/book";
import BlankNotice from "@/components/blank-notice";
import Button from "@/components/blank-notice/button";
import { useRouter } from "next/router";
import Seo from "@/components/Seo";
import useBooksWithInfinite from "@/lib/client/useSwr/useBooksWithInfinite";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

export const BOOKS_PER_PAGE = 5;
const TITLE = "독서중";

const Home = () => {
  const { data: session } = useSession();
  const { data, size, setSize } = useBooksWithInfinite(session?.user?.id);
  const [reachedEnd, setReachedEnd] = useState(false);
  const router = useRouter();
  const [ref, inView] = useInView({});
  useEffect(() => {
    if (reachedEnd) return;
    if (inView) {
      setSize(size + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);
  useEffect(() => {
    if (data) {
      const clonedData = [...data];
      setReachedEnd(clonedData.reverse()[0].books.length !== BOOKS_PER_PAGE);
    }
  }, [data]);

  return (
    <>
      <Seo title={TITLE} />
      <Header
        col1={<TitleCol>{TITLE}</TitleCol>}
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
          {data[0].books.length === 0 ? (
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
              {data.map((page) =>
                page.books.map((book: IBookWithTags) => (
                  <Item key={book.id} book={book} />
                ))
              )}
              <div ref={ref} />
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
