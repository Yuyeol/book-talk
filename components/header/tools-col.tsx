interface Props {
  children: React.ReactNode;
}

const ToolsCol = ({ children }: Props) => {
  return <div className="flex gap-2">{children}</div>;
};
export default ToolsCol;
