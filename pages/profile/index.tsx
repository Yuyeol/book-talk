import ResponsiveImage from "@/components/core/responsive-image";
import Header from "@/components/header";
import TitleCol from "@/components/header/title-col";
import { CF_DOMAIN } from "@/constants";
import useUser from "@/lib/client/useSwr/useUser";
import { signOut, useSession } from "next-auth/react";

const Profile = () => {
  const { data: session } = useSession();
  const { data } = useUser(session?.user?.id as string);
  return (
    <>
      <Header col1={<TitleCol>Profile</TitleCol>} />
      <div className="flex">
        <div className="w-16 rounded-full overflow-hidden">
          <ResponsiveImage
            src={(data?.user?.image as string) ?? `${CF_DOMAIN}no_book.png`}
            alt={(data?.user?.name as string) ?? "프로필사진"}
            aspectRatio="1"
            priority
          />
        </div>
        {data?.user?.nickname ?? data?.user?.name}
      </div>

      {session ? (
        <button onClick={() => signOut({ callbackUrl: "/login" })}>
          SignOut
        </button>
      ) : (
        "로그아웃되었습니다."
      )}
    </>
  );
};
export default Profile;
