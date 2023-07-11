import ResponsiveImage from "@/components/core/responsive-image";
import { CF_DOMAIN } from "@/constants";
import { IBookWithTags } from "@/types";
import Link from "next/link";
import BookAuthor from "@/components/book-author";

interface IProps {
  book: IBookWithTags;
}
const Item = ({ book }: IProps) => {
  return (
    <Link href={`/books/${book.id}`} className="flex py-1 space-x-2 mb-1">
      <div className="w-12 h-12 bg-white rounded-lg overflow-hidden">
        <ResponsiveImage
          src={book.image || `${CF_DOMAIN}icon/no-image.png`}
          alt={book.title}
          aspectRatio="1"
          objectFit="contain"
        />
      </div>
      <div>
        <div className="text-sm mb-1">
          <span className="font-semibold">{book.title}</span>
          <BookAuthor author={book.author} />
        </div>
        <div className="flex gap-2 flex-wrap ">
          {book.tags.map((tag) => (
            <div
              className="text-xs px-1.5 rounded-md"
              style={{ background: tag.bgColor, color: tag.txtColor }}
              key={tag.id}
            >
              {tag.name}
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
};
export default Item;
