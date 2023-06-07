import Layout from "@/components/layout";
import useSWR from "swr";
import { useRouter } from "next/router";
import TagForm from "@/components/tags/form";
import Header from "@/components/header";
import TitleCol from "@/components/header/title-col";
import fetcher from "@/lib/client/fetcher";

const Edit = () => {
  const router = useRouter();
  const { data } = useSWR(
    router.query.id ? `/api/tags/${router.query.id}` : null,
    fetcher
  );
  return (
    <Layout>
      <Header col1={<TitleCol hasBackBtn>Edit Tag</TitleCol>} />
      <TagForm tag={data?.tag} />
    </Layout>
  );
};

export default Edit;
