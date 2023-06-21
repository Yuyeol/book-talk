import Comment from "@/components/icon/comment";
import { PRIMARY_GREEN, SOFT_BLACK } from "@/constants";
import React, { Dispatch, SetStateAction } from "react";

interface IProps {
  isCommentOpen: boolean;
  setIsCommentOpen: Dispatch<SetStateAction<boolean>>;
}

const CommentButton: React.FC<IProps> = ({
  isCommentOpen,
  setIsCommentOpen,
}) => {
  return (
    <button onClick={() => setIsCommentOpen((prev) => !prev)} className="block">
      <Comment
        width={1.5}
        color={isCommentOpen ? PRIMARY_GREEN : SOFT_BLACK}
        fill={isCommentOpen}
      />
    </button>
  );
};

export default CommentButton;
