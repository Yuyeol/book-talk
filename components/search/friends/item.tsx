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
      <div className="w-12 h-12 bg-white rounded-lg overflow-hidden">
        <ResponsiveImage
          src={user.image || `${CF_DOMAIN}icon/no-image.png`}
          alt={user.name || "프로필사진"}
          aspectRatio="1"
          objectFit="contain"
        />
      </div>
      <div className="flex-1 text-sm mb-1">
        <div className="font-semibold">{user.nickname || user.name}</div>
        <div>{user.email}</div>
      </div>

      <button
        className="bg-white w-10 border-2 border-primary-green/50 rounded-md text-sm"
        onClick={() => onClickFriend(user.id)}
      >
        {isFriend ? "삭제" : "추가"}
      </button>
    </div>
  );
};
export default Item;
