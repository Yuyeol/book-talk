import { FRIEND_MODAL_ZINDEX } from "@/constants";
import useMutation from "@/lib/client/useMutation";
import useUser from "@/lib/client/useSwr/useUser";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

interface IProps {
  friendId: string;

  friendInfo: React.ReactNode;
  bookInfo1: React.ReactNode;
  bookInfo2: React.ReactNode;
  setIsModalOpen: (value: boolean) => void;
}
const InfoModal = ({
  friendId,
  friendInfo,
  bookInfo1,
  bookInfo2,
  setIsModalOpen,
}: IProps) => {
  const { data: session } = useSession();
  const { mutate } = useUser(session?.user?.id as string);
  const { mutation, data, loading } = useMutation(
    `/api/users/${session?.user?.id}/friends/delete`
  );
  const removeFriend = () => {
    if (loading) return;
    mutation({ friendId }, "POST");
  };
  useEffect(() => {
    if (data) {
      mutate();
      setIsModalOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  return (
    // 샤라락 올라오는 애니메이션 어떤데
    <div
      className="absolute top-0 left-0 w-full h-screen px-6 pt-6 flex flex-col items-center justify-center"
      style={{
        // paddingTop: `${HEADER_HEIGHT}rem`,
        // paddingBottom: `${NAVBAR_HEIGHT}rem`,
        zIndex: FRIEND_MODAL_ZINDEX,
      }}
    >
      <div className="bg-white max-w-sm w-full h-full overflow-scroll scrollbar-hide z-10 p-4">
        <button className="c_button_underlined" onClick={removeFriend}>
          삭제
        </button>
        {friendInfo}
        {bookInfo1}
        {bookInfo2}
      </div>
      <div
        className="fixed top-0 left-0 w-full h-screen bg-black opacity-50"
        onClick={() => setIsModalOpen(false)}
      />
    </div>
  );
};
export default InfoModal;
