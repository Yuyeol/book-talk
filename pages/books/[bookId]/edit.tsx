import Header from "@/components/header";
import TitleCol from "@/components/header/title-col";
import Form from "@/components/book/form";
import { useRouter } from "next/router";
import useBook from "@/lib/client/useSwr/useBook";
import Seo from "@/components/Seo";

const TITLE = "내 책 수정";

const Edit = () => {
  const {
    query: { bookId },
  } = useRouter();
  const { data } = useBook(parseInt(bookId as string));

  return (
    <>
      <Seo title={TITLE} />
      <Header col1={<TitleCol hasBackBtn>{TITLE}</TitleCol>} />
      <Form book={data?.book} />
    </>
  );
};
export default Edit;
