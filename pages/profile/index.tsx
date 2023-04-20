import Layout from "@/components/layout";
import { signOut, useSession } from "next-auth/react";

const Profile = () => {
  const { data: session } = useSession();
  return (
    <Layout>
      {session ? (
        <button onClick={() => signOut()}>SignOut</button>
      ) : (
        "로그아웃되었습니다."
      )}
    </Layout>
  );
};
export default Profile;
