import Layout from "@/components/layout";
import Header from "@/components/header";
import TitleCol from "@/components/header/title-col";
import Form from "@/components/book/form";
import { useRouter } from "next/router";
import useSWR, { SWRConfig } from "swr";
import fetcher from "@/lib/client/fetcher";
import { Book } from "@prisma/client";

const Edit = () => {
  const {
    query: { bookId },
  } = useRouter();
  const { data } = useSWR(bookId ? `/api/books/${bookId}` : null, fetcher);

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
    [url: string]: Book;
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
  const apiUrl = `${process.env.apiUrl}/api/books/${query.bookId}`;
  try {
    const book = await fetch(apiUrl).then((res) => res.json());
    return {
      props: {
        fallback: {
          [apiUrl]: book,
        },
      },
    };
  } catch (error) {
    console.error("Failed to fetch book:", error);
    return { props: {} };
  }
}
