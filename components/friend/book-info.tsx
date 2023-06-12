import { Book } from "@prisma/client";
import ResponsiveImage from "../core/responsive-image";
import { CF_DOMAIN } from "@/constants";
import Link from "next/link";

interface IProps {
  title: string;
  books: Book[];
}
const BookInfo = ({ title, books }: IProps) => {
  return (
    <div className="py-2 text-xs">
      <div>{title}</div>
      <div className="relative w-12 h-12">
        <div className="rounded-md overflow-hidden bg-slate-600">
          <ResponsiveImage
            src={(books?.[0]?.image as string) ?? `${CF_DOMAIN}no_book.png`}
            alt={(books?.[0]?.title as string) ?? "북커버"}
            aspectRatio="1"
            priority
          />
        </div>
        <div className="absolute top-0 right-0 translate-x-[50%] translate-y-[-50%] px-1 min-w-[16px] inline-block text-center my-auto rounded-full bg-slate-400">
          {books.length > 10 ? "+9" : books.length.toString()}
        </div>
      </div>
      {books.map((book) => (
        <Link
          href={`/books/${book.id}`}
          className="w-full bg-slate-400"
          key={book.id}
        >
          <div>사진</div>
          <div>
            {book.title} | {book.author}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default BookInfo;
