import ResponsiveImage from "@/components/core/responsive-image";
import { CF_DOMAIN } from "@/constants";
import { getElapsedTime } from "@/lib/client/getElapsedTime";
import useMutation from "@/lib/client/useMutation";
import useComments from "@/lib/client/useSwr/useComments";
import useToggleTransition from "@/lib/client/useToggleTransition";
import { ICommentResponse } from "@/types";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface IProps {
  memoId: number;
  isCommentOpen: boolean;
}

const Comment = ({ memoId, isCommentOpen }: IProps) => {
  const { data: session } = useSession();
  const { data, mutate } = useComments(memoId);
  const TRANSITION_DURATION = 800;
  const { transitionState, isMounted } = useToggleTransition(
    isCommentOpen,
    TRANSITION_DURATION + 100
  );
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
    setCommentValue("");
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
      {isMounted && (
        <>
          <div className="flex justify-between items-center mt-1">
            <input
              value={commentValue}
              onChange={handleCommentChange}
              className={`c_input text-xs w-0 transition-[width,opacity] ease-in
              ${
                transitionState === "start"
                  ? "w-full opacity-100"
                  : "w-0 opacity-0"
              }`}
              style={{ transitionDuration: `${TRANSITION_DURATION}ms` }}
              placeholder="댓글"
            />
            <div className="pl-2">
              <button
                onClick={handleCommentSubmit}
                className={`w-6 h-6 rounded-full text-white transition-[transform,opacity,backgroundColor] ease-in
                ${commentValue ? "bg-primary-green" : "bg-grey-3"}
                ${
                  transitionState === "start"
                    ? "rotate-[-360deg] opacity-100"
                    : "rotate-[0] opacity-0"
                }`}
                style={{ transitionDuration: `${TRANSITION_DURATION}ms` }}
              >
                ↑
              </button>
            </div>
          </div>
          <div
            className={`mb-2 divide-y-[1px] divide-primary-green/30 overflow-hidden transition-[transform,opacity] ease-in
            ${
              transitionState === "start"
                ? "translate-x-0"
                : "opacity-0 translate-x-1"
            }`}
            style={{
              transitionDuration: `${TRANSITION_DURATION / 2}ms`,
            }}
          >
            {data?.comments.map((comment) => (
              <div key={comment.id} className="pt-2 mt-2">
                {/* comment에 user가 연결되는데 딜레이가 있어 옵셔널체이닝이 필요 */}
                <div className="flex gap-1 transition-[transform,opacity] ease-in">
                  <div className="w-10 h-10 rounded-xl overflow-hidden">
                    <ResponsiveImage
                      src={
                        (comment.user?.image as string) ??
                        `${CF_DOMAIN}icon/no-image.png`
                      }
                      alt={(comment.user?.name as string) ?? "프로필사진"}
                      aspectRatio="1"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="">{comment.user?.name}</div>
                    <div className="text-sm">{comment.content}</div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-xs">
                    {getElapsedTime(comment.createdAt)}
                  </div>
                  {session?.user?.id === comment.userId && (
                    <button
                      onClick={() => handleCommentDelete(comment.id)}
                      className="text-xs"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};
export default Comment;
