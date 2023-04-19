import BookItem from "@/components/book/book-item";
import Layout from "@/components/layout";
import { useSession } from "next-auth/react";

const Home = () => {
  return (
    <Layout>
      <ul className="px-4 divide-y-2">
        <BookItem />
        <BookItem />
      </ul>
    </Layout>
  );
};
export default Home;
