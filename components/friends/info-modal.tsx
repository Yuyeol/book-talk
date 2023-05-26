interface IProps {
  children: React.ReactNode;
  setIsModalOpen: (value: boolean) => void;
}
const InfoModal = ({ children, setIsModalOpen }: IProps) => {
  return (
    <div className="absolute top-0 left-0 w-full h-full z-10">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white max-w-sm w-full z-10">
        {children}
      </div>

      <div
        className="absolute top-0 left-0 w-full h-full bg-black opacity-50"
        onClick={() => setIsModalOpen(false)}
      />
    </div>
  );
};
export default InfoModal;
