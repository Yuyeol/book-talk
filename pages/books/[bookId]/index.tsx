import Header from "@/components/header";
import TitleCol from "@/components/header/title-col";
import { useRouter } from "next/router";
import Info from "@/components/book/detail/info";
import Memo from "@/components/book/detail/memo";
import { useSession } from "next-auth/react";
import useBook from "@/lib/client/useSwr/useBook";
import useMemos from "@/lib/client/useSwr/useMemos";
import Form from "@/components/book/detail/memo/form";
import useMemoData from "@/lib/client/useSwr/useMemoData";
import { useState } from "react";

const BookDetail = () => {
  const { data: session } = useSession();
  const {
    query: { bookId },
  } = useRouter();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedMemoId, setSelectedMemoId] = useState<number | undefined>();
  const { data: bookData } = useBook(parseInt(bookId as string));
  const { data: memosData } = useMemos(parseInt(bookId as string));
  const { data: memoData } = useMemoData(selectedMemoId);
  const isOwner = bookData?.book.userId === session?.user?.id;

  return (
    <>
      <Header col1={<TitleCol hasBackBtn>Book Detail</TitleCol>} />
      {bookData && (
        <div className="mb-12">
          <Info book={bookData.book} />
          {isOwner && (
            <Form
              memo={memoData?.memo}
              setSelectedMemoId={setSelectedMemoId}
              isFormOpen={isFormOpen}
              setIsFormOpen={setIsFormOpen}
            />
          )}
          {memosData?.memos?.map((memo) => (
            <Memo
              memo={memo}
              key={memo.id}
              setSelectedMemoId={setSelectedMemoId}
            />
          ))}
        </div>
      )}
    </>
  );
};
export default BookDetail;
