import { getElapsedTime } from "@/lib/client/getElapsedTime";
import useMutation from "@/lib/client/useMutation";
import { IMemoWithReactions } from "@/pages/book/[id]";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";

interface IProps {
  memo: IMemoWithReactions;
  selectMemo: (id: number) => void;
}

const Memo = ({ memo, selectMemo }: IProps) => {
  const { data: session } = useSession();
  const router = useRouter();
  const { mutation, loading } = useMutation(
    `/api/book/${router.query.id}/memos`
  );
  const { mutation: commentMutation, loading: commentLoading } = useMutation(
    `/api/book/${router.query.id}/memos/${memo.id}/comment`
  );
  const { mutation: likeMutation, loading: likeLoading } = useMutation(
    `/api/book/${router.query.id}/memos/${memo.id}/like`
  );
  const currentUserLike = useMemo(
    () => memo.likes.find((like) => like.userId === session?.user?.id),
    [memo.likes, session?.user]
  );

  const onDeleteMemo = (id: number) => {
    if (loading) return;
    mutation({ id: id }, "DELETE");
  };
  const [commentValue, setCommentValue] = useState("");
  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentValue(e.target.value);
  };
  const handleCommentSubmit = () => {
    if (commentLoading) return;
    commentMutation({ content: commentValue }, "POST");
  };
  const handleCommentDelete = (id: number) => {
    if (commentLoading) return;
    commentMutation({ id }, "DELETE");
  };
  const handleLikeSubmit = () => {
    if (likeLoading) return;
    likeMutation({}, "POST");
  };
  const handleLikeDelete = () => {
    if (likeLoading) return;
    likeMutation(
      {
        // 해당 메모의 좋아요에 내가 좋아요를 눌렀는지 확인
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
          <button onClick={handleLikeDelete}>❤️</button>
        ) : (
          <button onClick={handleLikeSubmit}>🖤</button>
        )}
        <div className="flex justify-end gap-1">
          <button
            className="c_button_underlined"
            onClick={() => selectMemo(memo.id)}
          >
            수정
          </button>
          <button
            className="c_button_underlined"
            onClick={() => onDeleteMemo(memo.id)}
          >
            삭제
          </button>
        </div>
        <div>
          <input
            value={commentValue}
            onChange={handleCommentChange}
            className="c_input text-xs"
            placeholder="댓글"
          />
          <button
            onClick={handleCommentSubmit}
            className="w-6 h-6 rounded-full bg-black text-white"
          >
            ↑
          </button>
        </div>
        {memo.comments.map((comment) => (
          <div key={comment.id}>
            <div>{comment.user.name}</div>
            <div>{comment.content}</div>
            <div>{getElapsedTime(comment.createdAt)}</div>
            {session?.user?.id === comment.userId && (
              <button onClick={() => handleCommentDelete(comment.id)}>
                ❎
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Memo;
