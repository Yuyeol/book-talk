import InputBar from "@/components/book/detail/input-bar";
import Memo from "@/components/book/detail/memo";
import UnderlinedButton from "@/components/core/button/underlined-button";
import Header from "@/components/header";
import TitleCol from "@/components/header/title-col";
import ToolsCol from "@/components/header/tools-col";
import Edit from "@/components/icon/edit";
import Layout from "@/components/layout";
import { HEADER_ICON_COLOR, HEADER_ICON_WIDTH } from "@/constants";
import { Book as TBook, Memo as TMemo } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";

interface IBookResponse {
  book: TBook;
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
  return (
    <Layout>
      <Header
        col1={<TitleCol hasBackBtn>{bookData?.book.title}</TitleCol>}
        col2={
          <ToolsCol>
            <Link href={`/book/${router.query.id}/edit`}>
              <Edit width={HEADER_ICON_WIDTH} color={HEADER_ICON_COLOR} />
            </Link>
          </ToolsCol>
        }
      />
      {memosData?.memos.map((memo) => (
        <Memo memo={memo} key={memo.id} />
      ))}
      <InputBar />
    </Layout>
  );
};
export default BookDetail;
