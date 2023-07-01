import ResponsiveImage from "@/components/core/responsive-image";
import { CF_DOMAIN } from "@/constants";
import Link from "next/link";
import useBook from "@/lib/client/useSwr/useBook";
import Spinner from "@/components/icon/spinner";
import { Memo } from "@prisma/client";

interface IProps {
  memo: Memo;
}

const BookInfo = ({ memo }: IProps) => {
  const { data: bookData } = useBook(memo.bookId as number);
  return (
    <Link href={`/books/${memo.bookId}`}>
      <div className="flex gap-2 border-b-[1px] border-primary-green/70 pb-2 mb-2">
        {bookData ? (
          <div className="w-12">
            <ResponsiveImage
              src={bookData.book.image || `${CF_DOMAIN}no_book.png`}
              alt={bookData.book.title || "no book"}
              aspectRatio="1"
              priority
              objectFit="contain"
            />
          </div>
        ) : (
          <div className="w-12 h-12 flex justify-center items-center">
            <Spinner width={1} />
          </div>
        )}
        <div>
          <div className="font-semibold">{bookData?.book.title}</div>
          <div className="text-sm">{bookData?.book.author}</div>
        </div>
      </div>
    </Link>
  );
};
export default BookInfo;
