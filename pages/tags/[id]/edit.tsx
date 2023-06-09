import Layout from "@/components/layout";
import { useRouter } from "next/router";
import TagForm from "@/components/tags/form";
import Header from "@/components/header";
import TitleCol from "@/components/header/title-col";
import useTag from "@/lib/client/useSwr/useTag";

const Edit = () => {
  const router = useRouter();
  const { data } = useTag(parseInt(router.query.id as string));
  console.log(data);

  return (
    <Layout>
      <Header col1={<TitleCol hasBackBtn>Edit Tag</TitleCol>} />
      <TagForm tag={data?.tag} />
    </Layout>
  );
};

export default Edit;
