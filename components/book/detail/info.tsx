import ResponsiveImage from "@/components/core/responsive-image";
import { CF_DOMAIN } from "@/constants";
import { IBookWithTags } from "@/types";
import { Tag } from "@prisma/client";

interface IProps {
  book: IBookWithTags;
}

const Info = ({ book }: IProps) => {
  return (
    <div className="flex items-center p-2 bg-sub-green rounded-b-xl shadow-md">
      <div className="w-20 h-20 max-w-xs bg-soft-white rounded-xl overflow-hidden">
        <ResponsiveImage
          src={book.image || `${CF_DOMAIN}no_book.png`}
          alt={book.title}
          aspectRatio="1"
          priority
          objectFit="contain"
        />
      </div>
      <div className="flex-1 p-2 text-white">
        <div className="border-b-[0.5px] border-soft-white/80 text-sm pb-1">
          <span className="font-semibold">{book.title}</span>
          {book.author && <span> • {book.author}</span>}
        </div>
        <div className="my-1 text-xs">{book.description}</div>
        <div className="flex flex-wrap gap-1">
          {book.tags.map((tag: Tag) => (
            <div
              key={tag.id}
              className="c_tag_sm text-xs"
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
