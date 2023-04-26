import Header from "@/components/header";
import TitleCol from "@/components/header/title-col";
import Layout from "@/components/layout";
import TagForm from "@/components/tags/form";

const Create = () => {
  return (
    <Layout>
      <Header col1={<TitleCol>Create Tag</TitleCol>} />
      <TagForm />
    </Layout>
  );
};

export default Create;
