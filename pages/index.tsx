import Item from "@/components/book/item";
import Plus from "@/components/icon/plus";
import Layout from "@/components/layout";
import { Book, Tag } from "@prisma/client";
import Link from "next/link";
import useSWR, { SWRConfig } from "swr";
import { HEADER_ICON_WIDTH, HEADER_ICON_COLOR } from "@/constants";
import Search from "@/components/icon/search";
import Filter from "@/components/icon/filter";
import ToolsCol from "@/components/header/tools-col";
import TitleCol from "@/components/header/title-col";
import Header from "@/components/header";
import fetcher from "@/lib/client/fetcher";
import { useSession } from "next-auth/react";
import { authOptions } from "./api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { NextApiRequest, NextApiResponse } from "next";

export interface IBookWithTags extends Book {
  tags: Tag[];
}

export interface IBookResponse {
  books: IBookWithTags[];
  ok: boolean;
}

const Home = () => {
  const { data: session } = useSession();
  const { data } = useSWR<IBookResponse>(
    `/api/books?userId=${session?.user?.id}`,
    fetcher
  );
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
    [url: string]: Book[];
  };
}) {
  // SWR hooks inside the `SWRConfig` boundary will use those values.
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
  const apiUrl = `${process.env.apiUrl}/api/books?userId=${session?.user?.id}`;

  try {
    const books = await fetch(apiUrl).then((res) => res.json());
    return {
      props: {
        fallback: {
          [apiUrl]: books,
        },
      },
    };
  } catch (error) {
    console.error("Failed to fetch books:", error);
  }
}
