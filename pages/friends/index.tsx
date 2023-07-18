import Item from "@/components/friend/item";
import Header from "@/components/header";
import ToolsCol from "@/components/header/tools-col";
import TitleCol from "@/components/header/title-col";
import {
  HEADER_ICON_COLOR,
  HEADER_ICON_WIDTH,
  PRIMARY_GREEN,
} from "@/constants";
import { useSession } from "next-auth/react";
import Search from "@/components/icon/search";
import Link from "next/link";
import useUser from "@/lib/client/useSwr/useUser";
import SpinnerWrapper from "@/components/icon/spinner-wrapper";
import Spinner from "@/components/icon/spinner";
import BlankNotice from "@/components/blank-notice";
import FriendsIcon from "@/components/icon/friends";
import Button from "@/components/blank-notice/button";
import { useRouter } from "next/router";
import Seo from "@/components/Seo";

const TITLE = "친구";

const Friends = () => {
  const { data: session } = useSession();
  const { data: data } = useUser(session?.user?.id as string);
  const router = useRouter();

  return (
    <>
      <Seo title={TITLE} />
      <Header
        col1={<TitleCol>{TITLE}</TitleCol>}
        col2={
          <ToolsCol>
            <Link href="/friends/search">
              <Search width={HEADER_ICON_WIDTH} color={HEADER_ICON_COLOR} />
            </Link>
          </ToolsCol>
        }
      />
      {data ? (
        <>
          {data.user.friendsTo.length === 0 ? (
            <BlankNotice
              icon={<FriendsIcon width={6} color={PRIMARY_GREEN} />}
              mainDescription={"등록된 친구가 없습니다."}
              subDescription={
                <>
                  친구를 탐색하여
                  <br />
                  소통을 시작해보세요.
                </>
              }
              button={
                <Button
                  text="탐색하기"
                  onClick={() => {
                    router.push("/friends/search");
                  }}
                />
              }
            />
          ) : (
            <ul className="px-4 divide-y-[1px] divide-primary-green/50">
              {data.user.friendsTo.map((friend) => (
                <Item key={friend.id} friend={friend} />
              ))}
            </ul>
          )}
        </>
      ) : (
        <SpinnerWrapper type="screen-center">
          <Spinner />
        </SpinnerWrapper>
      )}
    </>
  );
};
export default Friends;
