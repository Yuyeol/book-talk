import Header from "@/components/header";
import TitleCol from "@/components/header/title-col";
import Layout from "@/components/layout";
import { Comment, Like, Memo as TMemo } from "@prisma/client";
import { useRouter } from "next/router";
import useSWR from "swr";
import { IBookWithTags } from "@/pages";
import Info from "@/components/book/detail/info";
import Memo from "@/components/book/detail/memo";
import Link from "next/link";
import { useSession } from "next-auth/react";
import fetcher from "@/lib/client/fetcher";

export interface IBookResponse {
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
export interface ILikeWithUser extends Like {
  user: {
    name: string;
    nickname: string;
    image: string;
  };
  userId: string;
}
export interface IMemoWithReactions extends TMemo {
  comments: ICommentWithUser[];
  likes: ILikeWithUser[];
}
interface IMemosResponse {
  memos: IMemoWithReactions[];
  ok: boolean;
}

const BookDetail = () => {
  const { data: session } = useSession();
  const {
    query: { bookId },
  } = useRouter();
  const { data: bookData } = useSWR<IBookResponse>(
    bookId ? `/api/books/${bookId}` : null,
    fetcher
  );
  const { data: memosData } = useSWR<IMemosResponse>(
    bookId ? `/api/books/${bookId}/memos` : null,
    fetcher
  );
  const isOwner = bookData?.book.userId === session?.user?.id;

  return (
    <Layout>
      <Header col1={<TitleCol hasBackBtn>{bookData?.book.title}</TitleCol>} />
      {bookData && (
        <>
          <Info book={bookData.book} />
          {/* 플로팅으로 만들것. */}
          {isOwner && (
            <Link href={`/book/${bookId}/memo/upload`} className="bg-slate-500">
              업로드
            </Link>
          )}
          {memosData?.memos.map((memo) => (
            <Memo memo={memo} key={memo.id} />
          ))}
        </>
      )}
    </Layout>
  );
};
export default BookDetail;
