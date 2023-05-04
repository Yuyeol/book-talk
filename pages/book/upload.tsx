import Layout from "@/components/layout";
import Header from "@/components/header";
import TitleCol from "@/components/header/title-col";
import Form from "@/components/book/form";

const Upload = () => {
  return (
    <Layout>
      <Header col1={<TitleCol hasBackBtn>Upload Book</TitleCol>} />
      <Form />
    </Layout>
  );
};
export default Upload;
