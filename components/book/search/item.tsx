import { Book } from "@prisma/client";

interface IProps {
  book: Book;
}
const Item = ({ book }: IProps) => {
  return <div>{book.title}</div>;
};
export default Item;
