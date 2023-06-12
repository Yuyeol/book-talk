import { getElapsedTime } from "@/lib/client/getElapsedTime";
import useMutation from "@/lib/client/useMutation";
import useComments from "@/lib/client/useSwr/useComments";
import { useSession } from "next-auth/react";
import { useState } from "react";

interface IProps {
  memoId: number;
}

const Comment = ({ memoId }: IProps) => {
  const { data: session } = useSession();
  const { data } = useComments(memoId);
  const { mutation, loading } = useMutation(`/api/comments`);
  const [commentValue, setCommentValue] = useState("");
  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentValue(e.target.value);
  };
  const handleCommentSubmit = () => {
    if (loading) return;
    mutation({ content: commentValue, memoId }, "POST");
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
      {data?.comments.map((comment) => (
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
