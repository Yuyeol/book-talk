import useMutation from "@/lib/client/useMutation";
import { useRouter } from "next/router";
import { IBookWithTags } from "@/types";
import { useEffect, useState } from "react";
import Dots from "@/components/icon/dots";
import { PRIMARY_GREEN, SOFT_WHITE } from "@/constants";
import useBooksWithInfinite from "@/lib/client/useSwr/useBooksWithInfinite";

interface IProps {
  book: IBookWithTags;
}

const More = ({ book }: IProps) => {
  const router = useRouter();
  const [isMoreOpened, setIsMoreOpened] = useState(false);

  const toggleButtons = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMoreOpened(!isMoreOpened);
  };
  const { mutate } = useBooksWithInfinite(book.userId);
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
    <div className="space-x-1 flex items-center">
      <div className="overflow-hidden px-2 translate-x-2">
        <div
          className={`transition-all duration-300 ease-out space-x-1 mb-1 ${
            isMoreOpened
              ? "translate-x-0 opacity-100"
              : "translate-x-2 opacity-0"
          }`}
        >
          <button
            className="c_button_block_xs"
            onClick={(e) => redirectWithHref(e, `/books/${book.id}/edit`)}
          >
            수정
          </button>
          <button className="c_button_block_xs" onClick={(e) => onDelete(e)}>
            삭제
          </button>
        </div>
      </div>
      <button
        className={`inline-block transition-transform duration-300 ease-out ${
          isMoreOpened ? "rotate-0" : "rotate-90"
        }`}
        onClick={(e) => toggleButtons(e)}
      >
        <div>
          <Dots
            width={1.25}
            color={isMoreOpened ? PRIMARY_GREEN : SOFT_WHITE}
          />
        </div>
      </button>
    </div>
  );
};
export default More;
