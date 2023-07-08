import Comment from "@/components/book/detail/memo/reaction/comment";
import Counter from "@/components/book/detail/memo/reaction/counter";
import useMutation from "@/lib/client/useMutation";
import { ILikeResponse } from "@/types";
import { useState } from "react";
import LikeButton from "@/components/book/detail/memo/reaction/like/like-button";
import CommentButton from "./comment/comment-button";
import useComments from "@/lib/client/useSwr/useComments";
import useMemoData from "@/lib/client/useSwr/useMemoData";

interface IProps {
  memoId: number;
}

const Reaction = ({ memoId }: IProps) => {
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const { data: memoData, mutate: memoMutate } = useMemoData(memoId);
  const { data: commentsData } = useComments(memoId);
  const { mutation: likeMutation, loading: likeLoading } =
    useMutation<ILikeResponse>(`/api/likes?memoId=${memoId}`);

  const handleLike = () => {
    if (likeLoading) return;
    memoMutate(
      (prev) =>
        prev && {
          ...prev,
          isLiked: !prev.isLiked,
          likeLength: prev.isLiked ? prev.likeLength - 1 : prev.likeLength + 1,
        },
      false
    );
    likeMutation({}, "POST");
  };
  return (
    <>
      <div className="flex gap-2">
        <LikeButton isLiked={!!memoData?.isLiked} handleLike={handleLike} />
        <CommentButton
          isCommentOpen={isCommentOpen}
          setIsCommentOpen={setIsCommentOpen}
        />
      </div>
      <div className="flex items-center text-xs text-center text-soft-black">
        <Counter type="like" length={memoData?.likeLength} />
        <Counter type="comment" length={commentsData?.comments.length} />
      </div>
      <Comment memoId={memoId} isCommentOpen={isCommentOpen} />
    </>
  );
};
export default Reaction;
