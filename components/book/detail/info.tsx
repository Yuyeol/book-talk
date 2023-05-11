import ResponsiveImage from "@/components/core/responsive-image";
import { CF_DOMAIN } from "@/constants";
import { IBookWithTags } from "@/pages";
import { Tag } from "@prisma/client";

interface IProps {
  book: IBookWithTags;
}

const Info = ({ book }: IProps) => {
  return (
    <div className="flex items-center p-1 bg-slate-800">
      <div className="w-20 h-20 max-w-xs bg-black">
        <ResponsiveImage
          src={book.image || `${CF_DOMAIN}no_book.png`}
          alt={book.title}
          aspectRatio="1"
          priority
          objectFit="contain"
        />
      </div>
      <div className="flex-1 p-1 text-white">
        <div className="border-b-[0.5px] border-white text-sm pb-1">
          {book.title} | {book.author}
        </div>
        <div className="my-1 text-xs">{book.description}</div>
        <div className="flex flex-wrap gap-1">
          {book.tags.map((tag: Tag) => (
            <div
              key={tag.id}
              className="px-2 py-0.5 rounded-full text-sm"
              style={{ color: tag.txtColor, background: tag.bgColor }}
            >
              {tag.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Info;
