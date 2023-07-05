import { IUserWithRelations } from "@/types";
import ResponsiveImage from "../../core/responsive-image";
import { CF_DOMAIN, PRIMARY_GREEN } from "@/constants";

interface IProps {
  friend: IUserWithRelations;
}
const FriendInfo = ({ friend }: IProps) => {
  return (
    <>
      <div
        className="p-4 pt-10"
        style={{
          background: `linear-gradient(0deg, transparent 40%, ${PRIMARY_GREEN} 40%)`,
        }}
      >
        <div className="rounded-full overflow-hidden max-w-[160px] mx-auto shadow-md border-4 border-soft-white">
          <ResponsiveImage
            src={(friend?.image as string) ?? `${CF_DOMAIN}icon/no-image.png`}
            alt={(friend?.name as string) ?? "프로필 사진"}
            aspectRatio="1"
            priority
          />
        </div>
      </div>
      <div className="text-center px-4">
        <div className="font-semibold">{friend?.name}</div>
        <div className="text-sm">{friend?.bio}</div>
      </div>
    </>
  );
};

export default FriendInfo;
