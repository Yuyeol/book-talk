import { getElapsedTime } from "@/lib/client/getElapsedTime";
import useMutation from "@/lib/client/useMutation";
import { IMemoWithReactions } from "@/pages/book/[bookId]";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

interface IProps {
  memo: IMemoWithReactions;
}

const Comment = ({ memo }: IProps) => {
  const { data: session } = useSession();
  const router = useRouter();
  const { mutation, loading } = useMutation(
    `/api/books/${router.query.id}/memos/${memo.id}/comment`
  );

  const [commentValue, setCommentValue] = useState("");
  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentValue(e.target.value);
  };
  const handleCommentSubmit = () => {
    if (loading) return;
    mutation({ content: commentValue }, "POST");
  };
  const handleCommentDelete = (id: number) => {
    if (loading) return;
    mutation({ id }, "DELETE");
  };

  return (
    <>
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
            <button onClick={() => handleCommentDelete(comment.id)}>❎</button>
          )}
        </div>
      ))}
    </>
  );
};
export default Comment;
