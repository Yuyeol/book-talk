import { getElapsedTime } from "@/lib/client/getElapsedTime";
import useMutation from "@/lib/client/useMutation";
import { useSession } from "next-auth/react";
import Comment from "@/components/book/detail/memo/comment";
import Link from "next/link";
import Like from "./like";
import BookInfo from "./book-info";
import { IMemoWithReactions } from "@/types";
import useMemos from "@/lib/client/useSwr/useMemos";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface IProps {
  memo: IMemoWithReactions;
}

const Memo = ({ memo }: IProps) => {
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
      <div className="px-3 py-2 rounded-lg bg-slate-100">
        <BookInfo memo={memo} />
        <div className="flex items-center justify-between text-xs border-b-[1px] border-slate-400 pb-2 mb-1">
          <div className="">Page. {memo.page}</div>
          <div className="text-xs">
            {getElapsedTime(memo.updatedAt) ?? getElapsedTime(memo.createdAt)}
          </div>
        </div>
        <div>{memo.content}</div>
        <Like memo={memo} />
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
        <Comment memoId={memo.id} />
      </div>
    </div>
  );
};
export default Memo;
