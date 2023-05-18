import ResponsiveImage from "@/components/core/responsive-image";
import { CF_DOMAIN } from "@/constants";
import { Book } from "@prisma/client";
import Link from "next/link";

interface IProps {
  book: Book;
}
const Item = ({ book }: IProps) => {
  return (
    <Link
      href={`/book/${book.id}`}
      className="flex items-center py-1 space-x-2"
    >
      <div className="w-12">
        <ResponsiveImage
          src={book.image || `${CF_DOMAIN}no_book.png`}
          alt={book.title}
          aspectRatio="1"
          priority
          objectFit="contain"
        />
      </div>
      <div>
        <div>
          {book.title} | {book.author}
        </div>
        <div className="text-sm">{book.description}</div>
      </div>
    </Link>
  );
};
export default Item;
