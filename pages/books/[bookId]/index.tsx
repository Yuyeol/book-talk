import Header from "@/components/header";
import TitleCol from "@/components/header/title-col";
import { useRouter } from "next/router";
import Info from "@/components/book/detail/info";
import Memo from "@/components/book/detail/memo";
import Link from "next/link";
import { useSession } from "next-auth/react";
import useBook from "@/lib/client/useSwr/useBook";
import useMemos from "@/lib/client/useSwr/useMemos";
import Plus from "@/components/icon/plus";
import { SOFT_WHITE } from "@/constants";
import { Portal } from "@/lib/client/portal";

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
      <Header col1={<TitleCol hasBackBtn>Book Detail</TitleCol>} />
      {isOwner && (
        <Portal id="upload-memo">
          <div className="max-w-lg w-full fixed bottom-20 flex justify-end pr-2">
            <div className="p-2 inline-block bg-primary-green rounded-full shadow-md">
              <Link
                href={`/books/${bookId}/memo/upload`}
                className="bg-slate-500"
              >
                <Plus width={2} color={SOFT_WHITE} />
              </Link>
            </div>
          </div>
        </Portal>
      )}
      {bookData && (
        <div className="mb-12">
          <Info book={bookData.book} />
          {memosData?.memos?.map((memo) => (
            <Memo memo={memo} key={memo.id} />
          ))}
        </div>
      )}
    </>
  );
};
export default BookDetail;
