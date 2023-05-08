interface IProps {
  children: React.ReactNode;
  title: string;
  description: string;
}
const List = ({ children, title, description }: IProps) => {
  return (
    <div>
      <div>{title}</div>
      <div>{description}</div>
      <ul className="flex gap-2">{children}</ul>
    </div>
  );
};

export default List;
