import Header from "@/components/header";
import TitleCol from "@/components/header/title-col";
import Form from "@/components/book/form";

const Upload = () => {
  return (
    <>
      <Header col1={<TitleCol hasBackBtn>내 책 등록</TitleCol>} />
      <Form />
    </>
  );
};
export default Upload;
