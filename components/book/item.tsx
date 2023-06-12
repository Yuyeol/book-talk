import ResponsiveImage from "../core/responsive-image";
import Link from "next/link";
import { getElapsedTime } from "@/lib/client/getElapsedTime";
import useMutation from "@/lib/client/useMutation";
import Image from "next/image";
import { CF_DOMAIN } from "@/constants";
import { useRouter } from "next/router";
import { IBookWithTags } from "@/types";
import { useEffect } from "react";
import useBooks from "@/lib/client/useSwr/useBooks";

interface IProps {
  book: IBookWithTags;
}

const Item = ({ book }: IProps) => {
  const router = useRouter();
  const { mutate } = useBooks(book.userId);
  const {
    mutation,
    loading,
    data: booksResData,
  } = useMutation(`/api/books/${book.id}`);
  const onDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    if (loading) return;
    mutation({}, "DELETE");
  };
  useEffect(() => {
    if (booksResData) {
      mutate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [booksResData]);

  const redirectWithHref = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    router.push(href);
  };
  return (
    <Link href={`/books/${book.id}`}>
      <li className="relative overflow-hidden">
        <div className="absolute w-full h-full blur-md">
          <Image
            src={book.image || `${CF_DOMAIN}no_book.png`}
            alt={book.title}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="w-40 max-w-xs pt-8 mx-auto">
          <ResponsiveImage
            src={book.image || `${CF_DOMAIN}no_book.png`}
            alt={book.title}
            aspectRatio="1"
            priority
            objectFit="contain"
          />
        </div>
        <div className="relative w-full px-4 pt-8 pb-4 text-white bg-gradient-to-t from-slate-800">
          <div className="flex items-center justify-between border-b-[0.5px] border-white">
            <div className="pb-1 text-l">
              {book.title} | {book.author}
            </div>
            <div className="text-xs text-right">
              {getElapsedTime(book.updatedAt || book.createdAt)}
            </div>
          </div>
          <div className="pt-2 pb-3 text-sm">{book.description}</div>
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {book.tags?.map((tag) => (
                <div
                  key={tag.id}
                  className="px-2 py-1 text-xs rounded-full"
                  style={{ color: tag.txtColor, background: tag.bgColor }}
                >
                  {tag.name}
                </div>
              ))}
            </div>
            <div className="space-x-1">
              <button
                className="c_button_underlined"
                onClick={(e) => redirectWithHref(e, `/books/${book.id}/edit`)}
              >
                수정
              </button>
              <button
                className="c_button_underlined"
                onClick={(e) => onDelete(e)}
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      </li>
    </Link>
  );
};
export default Item;
