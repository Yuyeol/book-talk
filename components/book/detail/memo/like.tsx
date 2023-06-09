import useMutation from "@/lib/client/useMutation";
import { IMemoWithReactions } from "@/types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

interface IProps {
  memo: IMemoWithReactions;
}

const Like = ({ memo }: IProps) => {
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
  // 해당 메모의 작성자인지 확인
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
    <>
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
    </>
  );
};
export default Like;
