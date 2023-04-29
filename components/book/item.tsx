import { Book } from "@prisma/client";
import dayjs from "dayjs";
import ResponsiveImage from "../core/responsive-image";
import { useCallback } from "react";
import Link from "next/link";

interface Props {
  book: Book;
}

const Item = ({ book }: Props) => {
  const getElapsedTime = useCallback((dateData: Date) => {
    const date = dayjs(dateData);
    const now = dayjs();
    const diff = now.diff(date);
    const min = diff / 1000 / 60;
    const hour = min / 60;
    const day = hour / 24;

    if (diff < 0) return "방금 전";
    if (diff / 1000 / 60 < 60) return `${Math.floor(min)}분 전`;
    else if (diff / 1000 / 60 / 60 < 24) return `${Math.floor(hour)}시간 전`;
    else if (diff / 1000 / 60 / 60 / 24 < 8) return `${Math.floor(day)}일 전`;
    else return String(date).split(" G")[0];
  }, []);

  return (
    <Link href={`/book/${book.id}`}>
      <li className="flex items-center py-2">
        <div className="w-12 h-12 mr-2 rounded-md bg-slate-600">
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
        <div className="flex-1">
          <div className="">{book.title}</div>
          <div className="text-sm">{book.description}</div>
        </div>
        <div className="w-[70px]">
          <div className="mx-auto mb-1 text-xs text-center">
            {getElapsedTime(book.updatedAt || book.createdAt)}
          </div>
          <div className="flex items-center justify-center w-5 h-5 mx-auto text-xs text-center text-white rounded-full bg-slate-600">
            1
          </div>
        </div>
      </li>
    </Link>
  );
};
export default Item;
