import { getElapsedTime } from "@/lib/client/elapsedTime";
import { Book } from "@prisma/client";
import dayjs from "dayjs";
import { useMemo } from "react";

interface Props {
  book: Book;
}

const Item = ({ book }: Props) => {
  return (
    <li className="flex items-center py-2">
      <div className="w-12 h-12 mr-2 rounded-md bg-slate-600">사진</div>
      <div className="flex-1">
        <div className="">{book.title}</div>
        <div className="text-sm">{book.description}</div>
      </div>
      <div className="w-[70px]">
        <div className="mx-auto mb-1 text-xs text-center">
          {getElapsedTime(
            book.updatedAt ? dayjs(book.updatedAt) : dayjs(book.createdAt)
          )}
        </div>
        <div className="flex items-center justify-center w-5 h-5 mx-auto text-xs text-center text-white rounded-full bg-slate-600">
          1
        </div>
      </div>
    </li>
  );
};
export default Item;
