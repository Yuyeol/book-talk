import ResponsiveImage from "@/components/core/responsive-image";
import Header from "@/components/header";
import TitleCol from "@/components/header/title-col";
import { CF_DOMAIN } from "@/constants";
import useMutation from "@/lib/client/useMutation";
import useUser from "@/lib/client/useSwr/useUser";
import { signOut, useSession } from "next-auth/react";

const Profile = () => {
  const { data: session } = useSession();
  const { data } = useUser(session?.user?.id as string);

  const { mutation, loading } = useMutation("/api/users");

  const handleSubmit = () => {
    // 이후 프로필 수정 만들때 구현할것
    if (loading) return;
    mutation(
      {
        nickname: "aaa",
      },
      "POST"
    );
  };

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
        <div>
          <div onClick={handleSubmit}>
            {data?.user?.nickname ?? data?.user?.name}
          </div>
        </div>
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
