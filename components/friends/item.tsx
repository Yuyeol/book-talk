import BookInfo from "@/components/friends/book-info";
import InfoModal from "./info-modal";
import { useState } from "react";
import { User } from "@prisma/client";
import ResponsiveImage from "../core/responsive-image";
import { CF_DOMAIN } from "@/constants";

interface IProps {
  friend: User;
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
        <InfoModal setIsModalOpen={setIsModalOpen}>
          <BookInfo type={1} />
          <BookInfo type={2} />
          <BookInfo type={3} />
        </InfoModal>
      )}
    </>
  );
};
export default Item;
