interface IProps {
  friendInfo: React.ReactNode;
  bookInfo1: React.ReactNode;
  bookInfo2: React.ReactNode;
  setIsModalOpen: (value: boolean) => void;
}
const InfoModal = ({
  friendInfo,
  bookInfo1,
  bookInfo2,
  setIsModalOpen,
}: IProps) => {
  return (
    <div className="absolute top-0 left-0 w-full h-full z-10 p-6 flex items-center justify-center">
      <div className="relative bg-white max-w-sm w-full z-10 p-4">
        {friendInfo}
        {bookInfo1}
        {bookInfo2}
      </div>

      <div
        className="absolute top-0 left-0 w-full h-full bg-black opacity-50"
        onClick={() => setIsModalOpen(false)}
      />
    </div>
  );
};
export default InfoModal;
