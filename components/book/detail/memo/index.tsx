import { getElapsedTime } from "@/lib/client/getElapsedTime";
import useMutation from "@/lib/client/useMutation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import BookInfo from "./book-info";
import useMemos from "@/lib/client/useSwr/useMemos";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Memo } from "@prisma/client";
import Reaction from "@/components/book/detail/memo/reaction";

interface IProps {
  memo: Memo;
  isSocialFeed?: boolean;
}

const Memo = ({ memo, isSocialFeed }: IProps) => {
  const {
    query: { bookId },
  } = useRouter();
  const { data: session } = useSession();
  const {
    mutation,
    loading,
    data: memoResData,
  } = useMutation(`/api/memos/${memo.id}`);
  const { data: memosData, mutate } = useMemos(parseInt(bookId as string));

  // 해당 메모의 작성자인지 확인
  const isOwner = memo.userId === session?.user?.id;

  const onDeleteMemo = (id: number) => {
    if (loading) return;
    mutation({ id: id }, "DELETE");
  };
  useEffect(() => {
    if (memoResData && memosData?.ok) {
      mutate({
        ok: true,
        memos: memosData.memos.filter((m) => m.id !== memo.id),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memoResData]);

  return (
    <div className="p-4">
      <div className="px-3 py-2 rounded-lg bg-soft-white border-[2px] border-primary-green shadow-md">
        {isSocialFeed && <BookInfo memo={memo} />}
        <div className="flex items-center justify-between text-xs pb-2 mb-1">
          <div className="">Page. {memo.page}</div>
          <div className="text-xs">
            {getElapsedTime(memo.updatedAt) ?? getElapsedTime(memo.createdAt)}
          </div>
        </div>
        <div className="text-sm border-b-[1px] border-primary-green/70 pb-2 mb-2">
          {memo.content}
        </div>
        <Reaction memoId={memo.id} />
        {isOwner && (
          <div className="flex justify-end gap-1">
            <Link
              href={`/books/${memo.bookId}/memo/${memo.id}/edit`}
              className="c_button_underlined"
            >
              수정
            </Link>
            <button
              className="c_button_underlined"
              onClick={() => onDeleteMemo(memo.id)}
            >
              삭제
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default Memo;
