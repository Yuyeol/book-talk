import ResponsiveImage from "@/components/core/responsive-image";
import { CF_DOMAIN } from "@/constants";
import { User } from "@prisma/client";

interface IProps {
  user: User;
  isFriend: boolean;
  onClickFriend: (id: string) => void;
}
const Item = ({ user, isFriend, onClickFriend }: IProps) => {
  return (
    <div className="flex items-center py-1 space-x-2">
      <div className="w-12 bg-white">
        <ResponsiveImage
          src={user.image || `${CF_DOMAIN}no_book.png`}
          alt={user.name || "프로필사진"}
          aspectRatio="1"
          priority
          objectFit="contain"
        />
      </div>
      <div className="flex-1">
        <div>{user.name}</div>
        <div className="text-sm">{user.email}</div>
      </div>

      <button className="bg-white w-10" onClick={() => onClickFriend(user.id)}>
        {isFriend ? "삭제" : "추가"}
      </button>
    </div>
  );
};
export default Item;
