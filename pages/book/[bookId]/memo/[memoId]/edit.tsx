import Layout from "@/components/layout";
import Header from "@/components/header";
import TitleCol from "@/components/header/title-col";
import Form from "@/components/book/detail/memo/form";
import useSWR from "swr";
import { useRouter } from "next/router";
import { Memo } from "@prisma/client";

interface IMemoResponse {
  memo: Memo;
  ok: boolean;
}

const Edit = () => {
  const {
    query: { bookId, memoId },
  } = useRouter();
  const { data } = useSWR<IMemoResponse>(
    bookId && memoId ? `/api/books/${bookId}/memos/${memoId}` : null
  );
  return (
    <Layout>
      <Header col1={<TitleCol hasBackBtn>Edit Memo</TitleCol>} />
      <Form memo={data?.memo} />
    </Layout>
  );
};
export default Edit;
