import Header from "@/components/header";
import TitleCol from "@/components/header/title-col";
import Setting from "@/components/profile/setting";
import Status from "@/components/profile/status";
import UserInfo from "@/components/profile/userInfo";
import useUser from "@/lib/client/useSwr/useUser";
import { useSession } from "next-auth/react";
import React from "react";

const Profile = () => {
  const { data: session } = useSession();
  const { data } = useUser(session?.user?.id as string);
  return (
    <div className="mb-8">
      <Header col1={<TitleCol>Profile</TitleCol>} />
      {/* 지금은 데이터를 밖에 빼놨지만, 로딩 처리하려면 data를 안에서 선택렌더링 해야할듯 */}
      {data && <UserInfo user={data?.user} />}
      {data && <Status user={data?.user} />}
      <Setting />
    </div>
  );
};
export default Profile;
