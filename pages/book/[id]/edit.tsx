import Layout from "@/components/layout";
import Header from "@/components/header";
import TitleCol from "@/components/header/title-col";
import Form from "@/components/book/form";
import { useRouter } from "next/router";
import useSWR from "swr";
import useMutation from "@/lib/client/useMutation";

const Edit = () => {
  const router = useRouter();
  const { data } = useSWR(
    router.query.id ? `/api/book/${router.query.id}` : null
  );
  return (
    <Layout>
      <Header col1={<TitleCol hasBackBtn>Edit Book</TitleCol>} />
      <Form book={data?.book} />
    </Layout>
  );
};
export default Edit;
