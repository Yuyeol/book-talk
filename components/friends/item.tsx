import BookInfo from "@/components/friends/book-info";
import InfoModal from "./info-modal";
import { useState } from "react";

const Item = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <li onClick={() => setIsModalOpen(true)}>
        <div className="flex items-center py-2 bg-white">
          <div className="w-12 h-12 mr-2 rounded-md bg-slate-600">사진</div>
          <div className="flex-1">
            <div className="">이름</div>
            <div className="text-sm">상태메시지</div>
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
