interface Props {
  children: React.ReactNode;
}

const TitleCol = ({ children }: Props) => {
  return <div className="text-lg font-bold text">{children}</div>;
};
export default TitleCol;
