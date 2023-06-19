import { getElapsedTime } from "@/lib/client/getElapsedTime";
import { IBookWithTags } from "@/types";
import More from "@/components/book/item/info/more";
import { useInView } from "react-intersection-observer";

interface IProps {
  book: IBookWithTags;
}

const Info = ({ book }: IProps) => {
  const [ref, inView] = useInView({ triggerOnce: true });

  return (
    <div
      ref={ref}
      className={`relative w-full py-2 px-4 text-soft-white bg-black/50 rounded-t-xl 
      transition-all ease-out delay-200 duration-500
      ${inView ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
    >
      <div className="flex items-center justify-between mb-2">
        <div>
          {book.title}
          {book.author && <span> • {book.author}</span>}
        </div>

        <More book={book} />
      </div>
      <div className="py-2 text-sm border-t-[1px] border-white/30">
        {book.description}
      </div>
      <div className="flex flex-wrap gap-2 pb-2">
        {book.tags?.map((tag) => (
          <div
            key={tag.id}
            className="px-1 py-[2px] text-[10px] rounded-md"
            style={{ color: tag.txtColor, background: tag.bgColor }}
          >
            {tag.name}
          </div>
        ))}
      </div>
      <div className="text-xs text-right">
        {getElapsedTime(book.updatedAt || book.createdAt)}
      </div>
    </div>
  );
};
export default Info;
