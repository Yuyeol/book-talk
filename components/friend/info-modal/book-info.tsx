import { Book } from "@prisma/client";
import ResponsiveImage from "../../core/responsive-image";
import { CF_DOMAIN } from "@/constants";
import Link from "next/link";
import BookAuthor from "@/components/book-author";
import { useState } from "react";

interface IProps {
  books: Book[];
}
const BookInfo = ({ books }: IProps) => {
  const [isListOpen, setIsListOpen] = useState(false);
  return (
    <div className="pt-3 pb-6 px-4 flex justify-center">
      <div
        className={`flex flex-col items-center origin-right transition-transform duration-500 ease-in
      ${isListOpen ? "scale-[.80]" : "scale-100"}`}
        onClick={() => setIsListOpen((prev) => !!books.length && !prev)}
      >
        <div className="relative w-16 h-16">
          <div className="rounded-md overflow-hidden bg-white">
            <ResponsiveImage
              src={
                (books?.[0]?.image as string) ?? `${CF_DOMAIN}icon/no-image.png`
              }
              alt={(books?.[0]?.title as string) ?? "북커버"}
              aspectRatio="1"
              priority
            />
          </div>
          <div className="absolute top-0 right-0 translate-x-[50%] translate-y-[-50%] px-1 min-w-[16px] inline-block text-center my-auto rounded-full bg-primary-green text-soft-white text-xs">
            {books.length > 10 ? "+9" : books.length.toString()}
          </div>
        </div>
        <div className="text-xs font-bold">읽고 있는 책</div>
      </div>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in
        ${isListOpen ? "w-full" : "w-[0px] scale-[.80]"}`}
      >
        <div
          className={`ml-3 mr-4 flex-1 flex flex-col divide-y-[1px] divide-primary-green/50 
        `}
        >
          {books.map((book) => (
            <Link href={`/books/${book.id}`} className="w-full" key={book.id}>
              <div className="text-sm ml-1 whitespace-nowrap py-1">
                <span className="font-semibold">{book.title}</span>
                <BookAuthor author={book.author} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookInfo;
