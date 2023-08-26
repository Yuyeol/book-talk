import ResponsiveImage from "@/components/core/responsive-image";
import { CF_DOMAIN } from "@/constants";
import Link from "next/link";
import useBook from "@/lib/client/useSwr/useBook";
import Spinner from "@/components/icon/spinner";
import { Memo } from "@prisma/client";
import useUser from "@/lib/client/useSwr/useUser";

interface IProps {
  memo: Memo;
}

const BookInfo = ({ memo }: IProps) => {
  const { data: bookData } = useBook(memo.bookId as number);
  const { data: userData } = useUser(memo.userId);

  return (
    <div>
      <div>
        {userData ? (
          <div className="flex items-center gap-1 mb-2">
            <div className="w-5 rounded-full overflow-hidden">
              <ResponsiveImage
                src={userData.user.image || `${CF_DOMAIN}icon/no-image.png`}
                alt={userData.user.name || "no book"}
                aspectRatio="1"
                objectFit="contain"
              />
            </div>
            <div className="text-sm">
              {userData.user.nickname || userData.user.name} •{" "}
              <span className="text-grey-3">{userData.user.email}</span>
            </div>
          </div>
        ) : (
          <div className="w-5 h-5 flex justify-center items-center">
            <Spinner width={1} />
          </div>
        )}
      </div>
      <Link href={`/books/${memo.bookId}`}>
        <div className="flex gap-2 border-b-[1px] border-primary-green/30 pb-2 mb-2">
          {bookData ? (
            <div className="w-12">
              <ResponsiveImage
                src={bookData.book.image || `${CF_DOMAIN}icon/no-image.png`}
                alt={bookData.book.title || "no book"}
                aspectRatio="1"
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
    </div>
  );
};
export default BookInfo;
