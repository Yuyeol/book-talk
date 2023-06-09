import Layout from "@/components/layout";
import Header from "@/components/header";
import TitleCol from "@/components/header/title-col";
import Form from "@/components/book/form";
import { useRouter } from "next/router";
import { SWRConfig } from "swr";
import { ssrFetcher } from "@/lib/server/ssrFetcher";
import { IBookResponse } from "@/types";
import useBook from "@/lib/client/useSwr/useBook";

const Edit = () => {
  const {
    query: { bookId },
  } = useRouter();
  const { data } = useBook(parseInt(bookId as string));

  return (
    <Layout>
      <Header col1={<TitleCol hasBackBtn>Edit Book</TitleCol>} />
      <Form book={data?.book} />
    </Layout>
  );
};
export default function Page({
  fallback,
}: {
  fallback: {
    [url: string]: IBookResponse;
  };
}) {
  return (
    <SWRConfig value={{ fallback }}>
      <Edit />
    </SWRConfig>
  );
}

export async function getServerSideProps({
  query,
}: {
  query: { bookId: string };
}) {
  return ssrFetcher(`/api/books/${query.bookId}`);
}
