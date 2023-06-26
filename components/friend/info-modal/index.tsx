import { FRIEND_MODAL_ZINDEX } from "@/constants";
import useToggleTransition from "@/lib/client/useToggleTransition";

interface IProps {
  friendId: string;
  more: React.ReactNode;
  friendInfo: React.ReactNode;
  bookInfo: React.ReactNode;
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
}
const InfoModal = ({
  more,
  friendInfo,
  bookInfo,
  isModalOpen,
  setIsModalOpen,
}: IProps) => {
  const { transitionState, isMounted } = useToggleTransition(isModalOpen, 500);
  return (
    <>
      {isMounted && (
        <div
          className="absolute top-0 left-0 w-full h-screen flex flex-col items-center justify-center p-4"
          style={{
            zIndex: FRIEND_MODAL_ZINDEX,
          }}
        >
          <div
            className={`bg-white max-w-sm w-full z-10 my-auto rounded-xl shadow-lg overflow-hidden
            transition-all duration-500 ease-in
            ${transitionState === "end" && "opacity-0 translate-y-4"}`}
          >
            {more}
            {friendInfo}
            {bookInfo}
          </div>
          <div
            className={`fixed top-0 left-0 w-full h-screen bg-black
            transition-all duration-500 ease-in
            ${transitionState === "start" ? "opacity-50" : "opacity-0"}`}
            onClick={() => setIsModalOpen(false)}
          />
        </div>
      )}
    </>
  );
};
export default InfoModal;
