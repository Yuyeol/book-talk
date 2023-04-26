interface Props {
  children: React.ReactNode;
}

const IconCol = ({ children }: Props) => {
  return <div className="flex gap-2">{children}</div>;
};
export default IconCol;
