import Heart from "@/components/icon/heart";
import { PRIMARY_GREEN, SOFT_BLACK } from "@/constants";
import useMutation from "@/lib/client/useMutation";
import useLikes from "@/lib/client/useSwr/useLikes";
import { ILikeResponse } from "@/types";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

interface IProps {
  memoId: number;
}

const Like = ({ memoId }: IProps) => {
  const { data: session } = useSession();
  const { data, mutate } = useLikes(memoId);
  const {
    mutation: likeMutation,
    loading: likeLoading,
    data: likeResData,
  } = useMutation<ILikeResponse>(`/api/likes`);

  // 해당 메모의 좋아요 중 내 좋아요 확인
  const currentUserLike = data?.likes.find(
    (like) => like.userId === session?.user?.id
  );

  // 해당 메모의 작성자인지 확인
  const handleLikeSubmit = () => {
    if (likeLoading) return;
    likeMutation({ memoId: memoId }, "POST");
  };
  const handleLikeDelete = () => {
    if (likeLoading) return;
    if (!currentUserLike) return;
    likeMutation(
      {
        id: currentUserLike.id,
      },
      "DELETE"
    );
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
      {currentUserLike ? (
        <>
          <button onClick={handleLikeDelete}>
            <Heart width={1} color={PRIMARY_GREEN} fill />
          </button>
          <span>{data?.likes.length}</span>
        </>
      ) : (
        <>
          <button onClick={handleLikeSubmit}>
            <Heart width={1} color={SOFT_BLACK} />
          </button>
          <span>{data?.likes.length}</span>
        </>
      )}
    </>
  );
};
export default Like;
