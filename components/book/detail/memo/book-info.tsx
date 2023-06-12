import ResponsiveImage from "@/components/core/responsive-image";
import { CF_DOMAIN } from "@/constants";
import Link from "next/link";
import { IMemoWithReactions } from "@/types";
import useBook from "@/lib/client/useSwr/useBook";

interface IProps {
  memo: IMemoWithReactions;
}

const BookInfo = ({ memo }: IProps) => {
  const { data: bookData } = useBook(memo.bookId);
  return (
    <Link href={`/books/${memo.bookId}`}>
      <div className="flex">
        <div className="w-20">
          <ResponsiveImage
            src={bookData?.book.image || `${CF_DOMAIN}no_book.png`}
            alt={bookData?.book.title || "no book"}
            aspectRatio="1"
            priority
            objectFit="contain"
          />
        </div>
        <div>
          {bookData?.book.title} | {bookData?.book.author}
        </div>
      </div>
    </Link>
  );
};
export default BookInfo;
