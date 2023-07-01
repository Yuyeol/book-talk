import ResponsiveImage from "../../core/responsive-image";
import Link from "next/link";
import Image from "next/image";
import { CF_DOMAIN } from "@/constants";
import { IBookWithTags } from "@/types";
import Info from "@/components/book/item/info";
import { useInView } from "react-intersection-observer";

interface IProps {
  book: IBookWithTags;
}

const Item = ({ book }: IProps) => {
  const [ref, inView] = useInView({ triggerOnce: true });
  return (
    <li
      ref={ref}
      className={`relative overflow-hidden rounded-xl shadow-md
      transition-all ease-out duration-500
      ${inView ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
    >
      <Link href={`/books/${book.id}`}>
        <div className="absolute w-full h-full blur-sm">
          <Image
            src={book.image || `${CF_DOMAIN}no_book.png`}
            alt={book.title}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="w-40 py-8 mx-auto">
          <ResponsiveImage
            src={book.image || `${CF_DOMAIN}no_book.png`}
            alt={book.title}
            aspectRatio="1"
            priority
            objectFit="contain"
          />
        </div>
        <Info book={book} />
      </Link>
    </li>
  );
};
export default Item;
