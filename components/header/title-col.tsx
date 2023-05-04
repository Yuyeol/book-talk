interface IProps {
  children: React.ReactNode;
}

const TitleCol = ({ children }: IProps) => {
  return (
    <div>
      <div></div>
      <div className="text-lg font-bold text">{children}</div>
    </div>
  );
};
export default TitleCol;
