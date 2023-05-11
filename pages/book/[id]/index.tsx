import InputBar from "@/components/book/detail/input-bar";
import Memo from "@/components/book/detail/memo";
import Header from "@/components/header";
import TitleCol from "@/components/header/title-col";
import ToolsCol from "@/components/header/tools-col";
import Write from "@/components/icon/write";
import Layout from "@/components/layout";
import { HEADER_ICON_COLOR, HEADER_ICON_WIDTH } from "@/constants";
import { Memo as TMemo } from "@prisma/client";
import { useRouter } from "next/router";
import useSWR from "swr";
import { IBookWithTags } from "@/pages";
import Info from "@/components/book/detail/info";

interface IBookResponse {
  book: IBookWithTags;
  ok: boolean;
}
interface IMemosResponse {
  memos: TMemo[];
  ok: boolean;
}

const BookDetail = () => {
  const router = useRouter();
  const { data: bookData } = useSWR<IBookResponse>(
    router.query.id ? `/api/book/${router.query.id}` : null
  );
  const { data: memosData } = useSWR<IMemosResponse>(
    router.query.id ? `/api/book/${router.query.id}/memo` : null
  );
  console.log(bookData);

  return (
    <Layout>
      <Header
        col1={<TitleCol hasBackBtn>{bookData?.book.title}</TitleCol>}
        col2={
          <ToolsCol>
            <button>
              <Write width={HEADER_ICON_WIDTH} color={HEADER_ICON_COLOR} />
            </button>
          </ToolsCol>
        }
      />
      {bookData && (
        <>
          <Info book={bookData.book} />
          {memosData?.memos.map((memo) => (
            <Memo memo={memo} key={memo.id} />
          ))}
          <InputBar />
        </>
      )}
    </Layout>
  );
};
export default BookDetail;
