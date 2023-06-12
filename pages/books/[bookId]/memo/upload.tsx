import Header from "@/components/header";
import TitleCol from "@/components/header/title-col";
import Form from "@/components/book/detail/memo/form";

const Upload = () => {
  return (
    <>
      <Header col1={<TitleCol hasBackBtn>Upload Memo</TitleCol>} />
      <Form />
    </>
  );
};
export default Upload;
