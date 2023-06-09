import Layout from "@/components/layout";
import Header from "@/components/header";
import TitleCol from "@/components/header/title-col";
import Form from "@/components/book/detail/memo/form";
import { useRouter } from "next/router";
import useMemoData from "@/lib/client/useSwr/useMemoData";

const Edit = () => {
  const {
    query: { memoId },
  } = useRouter();

  const { data } = useMemoData(parseInt(memoId as string));

  return (
    <Layout>
      <Header col1={<TitleCol hasBackBtn>Edit Memo</TitleCol>} />
      <Form memo={data?.memo} />
    </Layout>
  );
};
export default Edit;
