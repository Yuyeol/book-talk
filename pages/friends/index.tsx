import Item from "@/components/friends/item";
import Header from "@/components/header";
import ToolsCol from "@/components/header/tools-col";
import TitleCol from "@/components/header/title-col";
import Layout from "@/components/layout";
import { HEADER_ICON_COLOR, HEADER_ICON_WIDTH } from "@/constants";
import { useSession } from "next-auth/react";
import useSWR, { SWRConfig } from "swr";
import { Book, User } from "@prisma/client";
import Search from "@/components/icon/search";
import Link from "next/link";
import fetcher from "@/lib/client/fetcher";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { ssrFetcher } from "@/lib/server/ssrFetcher";

export interface IUserWithBooks extends User {
  books: Book[];
}
export interface IUserWithFriends extends IUserWithBooks {
  friendsTo: IUserWithBooks[];
}

const Friends = () => {
  const { data: session } = useSession();
  const { data: userData } = useSWR<{
    ok: boolean;
    user: IUserWithFriends;
  }>(`/api/users/${session?.user?.id}`, fetcher);

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
export default function Page({
  fallback,
}: {
  fallback: {
    [url: string]: IUserWithBooks;
  };
}) {
  return (
    <SWRConfig value={{ fallback }}>
      <Friends />
    </SWRConfig>
  );
}
export async function getServerSideProps({
  req,
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}) {
  const session = await getServerSession(req, res, authOptions);
  return ssrFetcher(`/api/users/${session?.user?.id}`);
}
