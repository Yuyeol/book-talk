import BookItem from "@/components/book/book-item";
import Layout from "@/components/layout";
import { Book } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import useSWR from "swr";

const Home = () => {
  const { data: session } = useSession();

  const { data } = useSWR("/api/book");

  return (
    <Layout>
      <ul className="px-4 divide-y-2">
        {data?.books.map((book: Book) => (
          <BookItem key={book.id} book={book} />
        ))}
      </ul>
    </Layout>
  );
};
export default Home;
