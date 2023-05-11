import { Book } from "@prisma/client";
import ResponsiveImage from "../core/responsive-image";
import Link from "next/link";
import { getElapsedTime } from "@/lib/client/getElapsedTime";
import { IBookWithTags } from "@/pages";
import UnderlinedButton from "../core/button/underlined-button";
import useMutation from "@/lib/client/useMutation";
import Image from "next/image";
import { CF_DOMAIN } from "@/constants";
import { useRouter } from "next/router";

interface IProps {
  book: IBookWithTags;
}

const Item = ({ book }: IProps) => {
  const router = useRouter();
  const { mutation, loading } = useMutation("/api/book");
  const onDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    if (loading) return;
    mutation({ id: book.id }, "DELETE");
    router.replace("/");
  };
  return (
    <Link href={`/book/${book.id}`}>
      <li className="relative overflow-hidden">
        <div className="absolute z-0 w-full h-full blur-sm">
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
              <Link href={`/book/${book.id}/edit`}>
                <UnderlinedButton text="수정" />
              </Link>
              <UnderlinedButton text="삭제" onClick={onDelete} />
            </div>
          </div>
        </div>
      </li>
    </Link>
  );
};
export default Item;
