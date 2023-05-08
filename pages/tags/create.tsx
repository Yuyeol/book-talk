import Header from "@/components/header";
import TitleCol from "@/components/header/title-col";
import Layout from "@/components/layout";
import Form from "@/components/tags/form";

const Create = () => {
  return (
    <Layout>
      <Header col1={<TitleCol hasBackBtn>Create Tag</TitleCol>} />
      <Form />
    </Layout>
  );
};

export default Create;
