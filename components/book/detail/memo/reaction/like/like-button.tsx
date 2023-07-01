import React from "react";
import Heart from "@/components/icon/heart";
import { PRIMARY_GREEN, SOFT_BLACK } from "@/constants";

interface ILikeButtonProps {
  isLiked: boolean;
  handleLike: () => void;
}

const LikeButton: React.FC<ILikeButtonProps> = ({ isLiked, handleLike }) => {
  return (
    <button onClick={handleLike} className="block">
      <Heart
        width={1.5}
        color={isLiked ? PRIMARY_GREEN : SOFT_BLACK}
        fill={isLiked}
      />
    </button>
  );
};

export default LikeButton;
