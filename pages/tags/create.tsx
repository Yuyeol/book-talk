import Header from "@/components/header";
import TitleCol from "@/components/header/title-col";
import Form from "@/components/tags/form";

const Create = () => {
  return (
    <>
      <Header col1={<TitleCol hasBackBtn>Create Tag</TitleCol>} />
      <Form />
    </>
  );
};

export default Create;
