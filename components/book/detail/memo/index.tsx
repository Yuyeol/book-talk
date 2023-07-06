import { getElapsedTime } from "@/lib/client/getElapsedTime";
import { useSession } from "next-auth/react";
import BookInfo from "./book-info";
import { Memo } from "@prisma/client";
import Reaction from "@/components/book/detail/memo/reaction";
import More from "@/components/book/detail/memo/more";
import { useInView } from "react-intersection-observer";

interface IProps {
  memo: Memo;
  // social은 selectedMemo가 없으므로 이것으로 social과 bookDetail을 구분
  setSelectedMemoId?: (id: number) => void;
}

const Memo = ({ memo, setSelectedMemoId }: IProps) => {
  const { data: session } = useSession();
  const [ref, inView] = useInView({ triggerOnce: true });
  // 해당 메모의 작성자인지 확인
  const isOwner = memo.userId === session?.user?.id;

  return (
    <div
      ref={ref}
      key={memo.id}
      className={`p-4 transition-all duration-[500ms] ease-in overflow-hidden
      ${!inView && "translate-y-4 opacity-0"}`}
    >
      {memo ? (
        <div className="px-3 py-2 rounded-lg bg-soft-white border-[2px] border-primary-green shadow-md">
          {!setSelectedMemoId && <BookInfo memo={memo} />}
          <div className="flex items-center justify-between text-xs pb-2 mb-1">
            <div className="">Page. {memo.page}</div>
            {isOwner && setSelectedMemoId && (
              <More
                memoId={memo.id}
                bookId={memo.bookId as number}
                setSelectedMemoId={setSelectedMemoId}
              />
            )}
          </div>
          <div className="text-sm">{memo.content}</div>
          <div className="text-xs text-end border-b-[1px] border-primary-green/30 pb-2 mb-2">
            {getElapsedTime(memo.updatedAt) ?? getElapsedTime(memo.createdAt)}
          </div>
          <Reaction memoId={memo.id} />
        </div>
      ) : (
        <>a</>
      )}
    </div>
  );
};
export default Memo;
