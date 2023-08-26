import Header from "@/components/header";
import TitleCol from "@/components/header/title-col";
import Form from "@/components/book/form";
import Seo from "@/components/Seo";

const TITLE = "내 책 등록";

const Upload = () => {
  return (
    <>
      <Seo title={TITLE} />
      <Header col1={<TitleCol hasBackBtn>{TITLE}</TitleCol>} />
      <Form />
    </>
  );
};
export default Upload;
