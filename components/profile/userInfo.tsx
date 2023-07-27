import ResponsiveImage from "@/components/core/responsive-image";
import { CF_DOMAIN, PRIMARY_GREEN } from "@/constants";
import { IUserWithRelations } from "@/types";

interface IProps {
  user: IUserWithRelations;
}

const UserInfo = ({ user }: IProps) => {
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
            src={(user?.image as string) ?? `${CF_DOMAIN}icon/no-image.png`}
            alt={(user.name as string) ?? "프로필 사진"}
            aspectRatio="1"
          />
        </div>
      </div>
      <div className="text-center px-4">
        <div className="font-semibold text-3xl">
          {user.nickname || user.name}
        </div>
        <div className="text-xl">{user.bio}</div>
      </div>
    </>
  );
};
export default UserInfo;
