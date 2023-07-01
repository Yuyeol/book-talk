import Item from "@/components/friend/item";
import Header from "@/components/header";
import ToolsCol from "@/components/header/tools-col";
import TitleCol from "@/components/header/title-col";
import { HEADER_ICON_COLOR, HEADER_ICON_WIDTH } from "@/constants";
import { useSession } from "next-auth/react";
import Search from "@/components/icon/search";
import Link from "next/link";
import useUser from "@/lib/client/useSwr/useUser";
import SpinnerWrapper from "@/components/icon/spinner-wrapper";
import Spinner from "@/components/icon/spinner";

const Friends = () => {
  const { data: session } = useSession();
  const { data: data } = useUser(session?.user?.id as string);

  return (
    <>
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
      {data ? (
        <ul className="px-4 divide-y-[1px] divide-primary-green/50">
          {data.user.friendsTo.map((friend) => (
            <Item key={friend.id} friend={friend} />
          ))}
        </ul>
      ) : (
        <SpinnerWrapper type="screen-center">
          <Spinner />
        </SpinnerWrapper>
      )}
    </>
  );
};
export default Friends;
