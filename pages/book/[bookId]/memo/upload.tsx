import Layout from "@/components/layout";
import Header from "@/components/header";
import TitleCol from "@/components/header/title-col";
import Form from "@/components/book/detail/memo/form";

const Upload = () => {
  return (
    <Layout>
      <Header col1={<TitleCol hasBackBtn>Upload Memo</TitleCol>} />
      <Form />
    </Layout>
  );
};
export default Upload;
