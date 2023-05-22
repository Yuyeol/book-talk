import ResponsiveImage from "@/components/core/responsive-image";
import { CF_DOMAIN } from "@/constants";
import { IBookWithTags } from "@/pages";
import Link from "next/link";

interface IProps {
  book: IBookWithTags;
}
const Item = ({ book }: IProps) => {
  return (
    <Link
      href={`/book/${book.id}`}
      className="flex items-center py-1 space-x-2"
    >
      <div className="w-12 bg-white">
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
        <div className="flex space-x-2">
          {book.tags.map((tag) => (
            <div
              className="text-xs px-1.5 rounded-full"
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
