import Item from "@/components/book/item";
import Plus from "@/components/icon/plus";
import Layout from "@/components/layout";
import Link from "next/link";
import { SWRConfig } from "swr";
import { HEADER_ICON_WIDTH, HEADER_ICON_COLOR } from "@/constants";
import Search from "@/components/icon/search";
import Filter from "@/components/icon/filter";
import ToolsCol from "@/components/header/tools-col";
import TitleCol from "@/components/header/title-col";
import Header from "@/components/header";
import { useSession } from "next-auth/react";
import { authOptions } from "./api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { NextApiRequest, NextApiResponse } from "next";
import { ssrFetcher } from "@/lib/server/ssrFetcher";
import useBooks from "@/lib/client/useSwr/useBooks";
import { IBookWithTags, IBooksResponse } from "@/types";

const Home = () => {
  const { data: session } = useSession();
  const { data } = useBooks(session?.user?.id);

  return (
    <Layout>
      <Header
        col1={<TitleCol>Book</TitleCol>}
        col2={
          <ToolsCol>
            <Link href="/book/upload">
              <Plus width={HEADER_ICON_WIDTH} color={HEADER_ICON_COLOR} />
            </Link>
            <Link href="/book/search">
              <Search width={HEADER_ICON_WIDTH} color={HEADER_ICON_COLOR} />
            </Link>
            <button>
              <Filter width={HEADER_ICON_WIDTH} color={HEADER_ICON_COLOR} />
            </button>
          </ToolsCol>
        }
      />
      <ul className="divide-y-2">
        {data?.books.map((book: IBookWithTags) => (
          <Item key={book.id} book={book} />
        ))}
      </ul>
    </Layout>
  );
};

export default function Page({
  fallback,
}: {
  fallback: {
    [url: string]: IBooksResponse;
  };
}) {
  return (
    <SWRConfig value={{ fallback }}>
      <Home />
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
  return ssrFetcher(`/api/books?userId=${session?.user?.id}`);
}
