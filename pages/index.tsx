import BookItem from "@/components/book/item";
import FloatingButton from "@/components/floating-button";
import Plus from "@/components/icon/plus";
import Layout from "@/components/layout";

const Home = () => {
  return (
    <Layout>
      <ul className="px-4 divide-y-2">
        <BookItem />
        <BookItem />
      </ul>

      <FloatingButton href="/book/1">
        <Plus width={8} color="white" />
      </FloatingButton>
    </Layout>
  );
};
export default Home;
