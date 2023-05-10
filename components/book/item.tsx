import { Book } from "@prisma/client";
import ResponsiveImage from "../core/responsive-image";
import Link from "next/link";
import { getElapsedTime } from "@/lib/client/getElapsedTime";
import { IBookWithTags } from "@/pages";
import UnderlinedButton from "../core/button/underlined-button";
import useMutation from "@/lib/client/useMutation";

interface IProps {
  book: IBookWithTags;
}

const Item = ({ book }: IProps) => {
  return (
    <Link href={`/book/${book.id}`}>
      <li className="relative bg-slate-500">
        <div className="w-full max-w-xs mx-auto">
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
        <div className="absolute bottom-0 w-full px-4 pt-8 pb-4 text-white bg-gradient-to-t from-slate-800">
          <div className="flex items-center justify-between border-b-[0.5px] border-white">
            <div className="pb-1 text-l">
              {book.title} | {book.author}
            </div>
            <div className="text-xs text-right">
              {getElapsedTime(book.updatedAt || book.createdAt)}
            </div>
          </div>
          <div className="pt-2 pb-3 text-sm">{book.description}</div>
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {book.tags?.map((tag) => (
                <div
                  key={tag.id}
                  className="px-2 py-1 text-xs rounded-full"
                  style={{ color: tag.txtColor, background: tag.bgColor }}
                >
                  {tag.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </li>
    </Link>
  );
};
export default Item;
