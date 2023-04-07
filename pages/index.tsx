import BookItem from "@/components/book/item";
import Plus from "@/components/icon/plus";
import Layout from "@/components/layout";

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
