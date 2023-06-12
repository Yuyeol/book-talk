import Item from "@/components/friend/item";
import Header from "@/components/header";
import ToolsCol from "@/components/header/tools-col";
import TitleCol from "@/components/header/title-col";
import Layout from "@/components/layout";
import { HEADER_ICON_COLOR, HEADER_ICON_WIDTH } from "@/constants";
import { useSession } from "next-auth/react";
import Search from "@/components/icon/search";
import Link from "next/link";
import useUser from "@/lib/client/useSwr/useUser";

const Friends = () => {
  const { data: session } = useSession();
  const { data: userData } = useUser(session?.user?.id as string);

  return (
    <Layout>
      <Header
        col1={<TitleCol>Friends</TitleCol>}
        col2={
          <ToolsCol>
            <Link href="/friends/search">
              <Search width={HEADER_ICON_WIDTH} color={HEADER_ICON_COLOR} />
            </Link>
          </ToolsCol>
        }
      />
      {userData?.user?.friendsTo && (
        <ul className="px-4 divide-y-2">
          {userData.user.friendsTo.map((friend) => (
            <Item key={friend.id} friend={friend} />
          ))}
        </ul>
      )}
    </Layout>
  );
};
export default Friends;
