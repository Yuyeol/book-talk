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
import SpinnerWrapper from "@/components/icon/spinner-wrapper";
import Spinner from "@/components/icon/spinner";
import { useInView } from "react-intersection-observer";

const BookDetail = () => {
  const { data: session } = useSession();
  const {
    query: { bookId },
  } = useRouter();
  const [ref, inView] = useInView({ triggerOnce: true });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedMemoId, setSelectedMemoId] = useState<number | undefined>();
  const { data: bookData } = useBook(parseInt(bookId as string));
  const { data: memosData } = useMemos(parseInt(bookId as string));
  const { data: memoData } = useMemoData(selectedMemoId);
  const isOwner = bookData?.book.userId === session?.user?.id;

  return (
    <>
      <Header col1={<TitleCol hasBackBtn>독서 노트</TitleCol>} />
      <div className="mb-12">
        {bookData && memosData ? (
          <>
            <div
              ref={ref}
              className={`transition-all duration-[500ms] ease-out overflow-hidden
            ${!inView && "-translate-y-[100%]"}`}
            >
              <Info book={bookData.book} />
              {isOwner && (
                <Form
                  memo={memoData?.memo}
                  setSelectedMemoId={setSelectedMemoId}
                  isFormOpen={isFormOpen}
                  setIsFormOpen={setIsFormOpen}
                />
              )}
            </div>
            {memosData.memos.map((memo) => (
              <Memo
                key={memo.id}
                memo={memo}
                setSelectedMemoId={setSelectedMemoId}
              />
            ))}
          </>
        ) : (
          <SpinnerWrapper type="screen-center">
            <Spinner />
          </SpinnerWrapper>
        )}
      </div>
    </>
  );
};
export default BookDetail;
