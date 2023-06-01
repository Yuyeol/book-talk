import Form from "@/components/book/detail/memo/form";
import Header from "@/components/header";
import TitleCol from "@/components/header/title-col";
import Layout from "@/components/layout";
import { Comment, Memo as TMemo } from "@prisma/client";
import { useRouter } from "next/router";
import useSWR from "swr";
import { IBookWithTags } from "@/pages";
import Info from "@/components/book/detail/info";
import Memo from "@/components/book/detail/memo";
import { useCallback, useState } from "react";
import { useAppDispatch } from "@/app/hooks";
import { openForm } from "@/features/memo/memoSlice";

interface IBookResponse {
  book: IBookWithTags;
  ok: boolean;
}

export interface ICommentWithUser extends Comment {
  user: {
    name: string;
    nickname: string;
    image: string;
  };
  userId: string;
}
export interface IMemoWithComments extends TMemo {
  comments: ICommentWithUser[];
}
interface IMemosResponse {
  memos: IMemoWithComments[];
  ok: boolean;
}

const BookDetail = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { data: bookData } = useSWR<IBookResponse>(
    router.query.id ? `/api/book/${router.query.id}` : null
  );
  const { data: memosData } = useSWR<IMemosResponse>(
    router.query.id ? `/api/book/${router.query.id}/memos` : null
  );
  console.log(memosData);

  const [selectedMemo, setSelectedMemo] = useState<IMemoWithComments>();
  // 메모 수정하기 위해 select
  const selectMemo = useCallback(
    (id: number) => {
      setSelectedMemo(memosData?.memos.find((memo) => memo.id === id));
      dispatch(openForm());
    },
    [dispatch, memosData?.memos]
  );

  return (
    <Layout>
      <Header col1={<TitleCol hasBackBtn>{bookData?.book.title}</TitleCol>} />
      {bookData && (
        <>
          <Info book={bookData.book} />
          <Form selectedMemo={selectedMemo} />
          {memosData?.memos.map((memo) => (
            <Memo memo={memo} key={memo.id} selectMemo={selectMemo} />
          ))}
        </>
      )}
    </Layout>
  );
};
export default BookDetail;
