import Comment from "@/components/book/detail/memo/reaction/comment";
import LikeCounter from "@/components/book/detail/memo/reaction/like/like-counter";
import useMutation from "@/lib/client/useMutation";
import useLikes from "@/lib/client/useSwr/useLikes";
import { ILikeResponse } from "@/types";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import LikeButton from "@/components/book/detail/memo/reaction/like/like-button";
import CommentButton from "./comment/comment-button";

interface IProps {
  memoId: number;
}

const Reaction = ({ memoId }: IProps) => {
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const { data: session } = useSession();
  const { data, mutate } = useLikes(memoId);
  const {
    mutation: likeMutation,
    loading: likeLoading,
    data: likeResData,
  } = useMutation<ILikeResponse>(`/api/likes`);

  // 해당 메모의 좋아요 중 내가 누른 좋아요 확인
  const currentUserLike = data?.likes.find(
    (like) => like.userId === session?.user?.id
  );
  const handleLike = () => {
    if (likeLoading) return;
    if (currentUserLike)
      likeMutation(
        {
          id: currentUserLike.id,
        },
        "DELETE"
      );
    else likeMutation({ memoId: memoId }, "POST");
  };
  useEffect(() => {
    if (likeResData && data) {
      if (currentUserLike)
        mutate({
          ok: true,
          likes: data.likes.filter((like) => like.id !== currentUserLike.id),
        });
      else mutate({ ok: true, likes: [...data.likes, likeResData.like] });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [likeResData]);
  return (
    <>
      <div className="flex gap-2">
        <LikeButton isLiked={!!currentUserLike} handleLike={handleLike} />
        <CommentButton
          isCommentOpen={isCommentOpen}
          setIsCommentOpen={setIsCommentOpen}
        />
      </div>
      <LikeCounter likeLength={data?.likes.length} />

      {isCommentOpen && <Comment memoId={memoId} />}
    </>
  );
};
export default Reaction;
