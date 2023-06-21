import { getElapsedTime } from "@/lib/client/getElapsedTime";
import useMutation from "@/lib/client/useMutation";
import useComments from "@/lib/client/useSwr/useComments";
import { ICommentResponse } from "@/types";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface IProps {
  memoId: number;
}

const Comment = ({ memoId }: IProps) => {
  const { data: session } = useSession();
  const { data, mutate } = useComments(memoId);
  const {
    mutation,
    loading,
    data: commentResData,
  } = useMutation<ICommentResponse>(`/api/comments`);
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

  useEffect(() => {
    if (commentResData && data)
      if (commentResData.method === "POST")
        mutate({
          ok: true,
          comments: [...data.comments, commentResData.comment],
        });
      else if (commentResData.method === "DELETE")
        mutate({
          ok: true,
          comments: data.comments.filter(
            (comment) => comment.id !== commentResData.comment.id
          ),
        });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commentResData]);

  return (
    <>
      <div className="flex items-center">
        <input
          value={commentValue}
          onChange={handleCommentChange}
          // TODO: 오픈시 full width로 변하고, 버튼은 opacity로 나타나는 애니메이션
          className="c_input text-xs flex-1 w-0 transition-[flex] duration-200 ease-out mr-2"
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
          {/* comment에 user가 연결되는데 딜레이가 있어 옵셔널체이닝이 필요 */}
          <div>{comment.user?.name}</div>
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
