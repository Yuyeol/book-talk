import BookInfo from "@/components/friend/book-info";
import InfoModal from "./info-modal";
import { useState } from "react";
import ResponsiveImage from "../core/responsive-image";
import { CF_DOMAIN } from "@/constants";
import FriendInfo from "./friend-info";
import { Portal } from "@/lib/client/portal";
import { IUserWithBooks } from "@/types";

interface IProps {
  friend: IUserWithBooks;
}

const Item = ({ friend }: IProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <li onClick={() => setIsModalOpen(true)}>
        <div className="flex items-center py-2 bg-white">
          <div className="w-12 h-12 mr-2 rounded-md bg-slate-600 overflow-hidden">
            <ResponsiveImage
              src={(friend.image as string) ?? `${CF_DOMAIN}no_book.png`}
              alt={(friend.name as string) ?? "프로필사진"}
              aspectRatio="1"
              priority
            />
          </div>
          <div className="flex-1">
            <div className="">{friend.nickname ?? friend.name}</div>
            <div className="text-sm">{friend.bio ?? ""}</div>
          </div>
        </div>
      </li>
      {isModalOpen && (
        <Portal id="friend-modal">
          <InfoModal
            setIsModalOpen={setIsModalOpen}
            friendId={friend.id}
            friendInfo={<FriendInfo friend={friend} />}
            bookInfo1={<BookInfo title={"읽고 있는 책"} books={friend.books} />}
            bookInfo2={
              <BookInfo
                title={"아카이브"}
                books={friend.books.filter((book) => book.finishedAt)}
              />
            }
          />
        </Portal>
      )}
    </>
  );
};
export default Item;
