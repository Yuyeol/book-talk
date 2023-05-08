interface IProps {
  children: React.ReactNode;
}

const ToolsCol = ({ children }: IProps) => {
  return <div className="flex gap-2">{children}</div>;
};
export default ToolsCol;
