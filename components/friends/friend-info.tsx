import ResponsiveImage from "../core/responsive-image";
import { CF_DOMAIN } from "@/constants";
import { IUserWithBooks } from "@/pages/friends";

interface IProps {
  friend: IUserWithBooks;
}
const FriendInfo = ({ friend }: IProps) => {
  return (
    <div className="rounded-md overflow-hidden bg-slate-600">
      <ResponsiveImage
        src={(friend?.image as string) ?? `${CF_DOMAIN}no_book.png`}
        alt={(friend?.name as string) ?? "프로필 사진"}
        aspectRatio="1"
        priority
      />
      <div>{friend?.name}</div>
      <div>{friend?.bio}</div>
    </div>
  );
};

export default FriendInfo;
