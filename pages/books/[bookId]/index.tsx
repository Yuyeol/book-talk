import Header from "@/components/header";
import TitleCol from "@/components/header/title-col";
import { useRouter } from "next/router";
import Info from "@/components/book/detail/info";
import Memo from "@/components/book/detail/memo";
import Link from "next/link";
import { useSession } from "next-auth/react";
import useBook from "@/lib/client/useSwr/useBook";
import useMemos from "@/lib/client/useSwr/useMemos";

const BookDetail = () => {
  const { data: session } = useSession();
  const {
    query: { bookId },
  } = useRouter();
  const { data: bookData } = useBook(parseInt(bookId as string));
  const { data: memosData } = useMemos(parseInt(bookId as string));
  const isOwner = bookData?.book.userId === session?.user?.id;

  return (
    <>
      <Header col1={<TitleCol hasBackBtn>{bookData?.book.title}</TitleCol>} />
      {bookData && (
        <>
          <Info book={bookData.book} />
          {/* 플로팅으로 만들것. */}
          {isOwner && (
            <Link
              href={`/books/${bookId}/memo/upload`}
              className="bg-slate-500"
            >
              업로드
            </Link>
          )}
          {memosData?.memos?.map((memo) => (
            <Memo memo={memo} key={memo.id} />
          ))}
        </>
      )}
    </>
  );
};
export default BookDetail;
