import { getElapsedTime } from "@/lib/client/getElapsedTime";
import useMutation from "@/lib/client/useMutation";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Comment from "@/components/book/detail/memo/comment";
import { IMemoWithReactions } from "@/types";

interface IProps {
  memo: IMemoWithReactions;
}

const Memo = ({ memo }: IProps) => {
  const { data: session } = useSession();
  const {
    query: { bookId },
  } = useRouter();
  const { mutation: likeMutation, loading: likeLoading } = useMutation(
    `/api/books/${bookId}/memos/${memo.id}/like`
  );

  // 해당 메모의 좋아요 중 내 좋아요 확인
  const currentUserLike = memo.likes.find(
    (like) => like.userId === session?.user?.id
  );
  const handleLikeSubmit = () => {
    if (likeLoading) return;
    likeMutation({}, "POST");
  };
  const handleLikeDelete = () => {
    if (likeLoading) return;
    likeMutation(
      {
        id: currentUserLike?.id,
      },
      "DELETE"
    );
  };

  return (
    <div className="p-4">
      <div className="px-3 py-2 rounded-lg bg-slate-100">
        <div className="flex items-center justify-between text-xs border-b-[1px] border-slate-400 pb-2 mb-1">
          <div className="">Page. {memo.page}</div>
          <div className="text-xs">
            {getElapsedTime(memo.updatedAt) ?? getElapsedTime(memo.createdAt)}
          </div>
        </div>
        <div>{memo.content}</div>
        {currentUserLike ? (
          <>
            <button onClick={handleLikeDelete}>❤️</button>
            <span>{memo.likes.length}</span>
          </>
        ) : (
          <>
            <button onClick={handleLikeSubmit}>🖤</button>
            <span>{memo.likes.length}</span>
          </>
        )}

        <Comment memo={memo} />
      </div>
    </div>
  );
};
export default Memo;
