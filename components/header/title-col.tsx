interface Props {
  children: React.ReactNode;
}

const TitleCol = ({ children }: Props) => {
  return (
    <div>
      <div></div>
      <div className="text-lg font-bold text">{children}</div>
    </div>
  );
};
export default TitleCol;
