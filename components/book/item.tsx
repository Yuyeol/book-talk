import { Book } from "@prisma/client";
import ResponsiveImage from "../core/responsive-image";
import Link from "next/link";
import { getElapsedTime } from "@/lib/client/getElapsedTime";

interface IProps {
  book: Book;
}

const Item = ({ book }: IProps) => {
  return (
    <Link href={`/book/${book.id}`}>
      <li className="flex items-center py-2">
        <div className="w-12 h-12 mr-2 rounded-md bg-slate-600">
          {book.image && (
            <ResponsiveImage
              src={book.image}
              alt={book.title}
              aspectRatio="1"
              priority
              objectFit="contain"
            />
          )}
        </div>
        <div className="flex-1">
          <div className="">{book.title}</div>
          <div className="text-sm">{book.description}</div>
        </div>
        <div className="w-[70px]">
          <div className="mx-auto mb-1 text-xs text-center">
            {getElapsedTime(book.updatedAt || book.createdAt)}
          </div>
          <div className="flex items-center justify-center w-5 h-5 mx-auto text-xs text-center text-white rounded-full bg-slate-600">
            1
          </div>
        </div>
      </li>
    </Link>
  );
};
export default Item;
