import BookInfo from "@/components/friend/info-modal/book-info";
import { useState } from "react";
import ResponsiveImage from "@/components/core/responsive-image";
import { CF_DOMAIN } from "@/constants";
import FriendInfo from "@/components/friend/info-modal/friend-info";
import { Portal } from "@/lib/client/portal";
import { IUserWithRelations } from "@/types";
import InfoModal from "@/components/friend/info-modal";
import More from "./info-modal/more";

interface IProps {
  friend: IUserWithRelations;
}

const Item = ({ friend }: IProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <li onClick={() => setIsModalOpen(true)}>
        <div className="flex items-center py-2 bg-white">
          <div className="w-12 h-12 mr-2 rounded-md bg-soft-white overflow-hidden">
            <ResponsiveImage
              src={(friend.image as string) ?? `${CF_DOMAIN}icon/no-image.png`}
              alt={(friend.name as string) ?? "프로필사진"}
              aspectRatio="1"
            />
          </div>
          <div className="flex-1">
            <div className="">{friend.nickname ?? friend.name}</div>
            <div className="text-sm">{friend.bio ?? ""}</div>
          </div>
        </div>
      </li>
      <Portal id="friend-modal">
        <InfoModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          friendId={friend.id}
          more={<More friendId={friend.id} setIsModalOpen={setIsModalOpen} />}
          friendInfo={<FriendInfo friend={friend} />}
          bookInfo={<BookInfo books={friend.books} />}
        />
      </Portal>
    </>
  );
};
export default Item;
