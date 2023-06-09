import Header from "@/components/header";
import TitleCol from "@/components/header/title-col";
import Form from "@/components/book/form";
import { useRouter } from "next/router";
import useBook from "@/lib/client/useSwr/useBook";

const Edit = () => {
  const {
    query: { bookId },
  } = useRouter();
  const { data } = useBook(parseInt(bookId as string));

  return (
    <>
      <Header col1={<TitleCol hasBackBtn>Edit Book</TitleCol>} />
      <Form book={data?.book} />
    </>
  );
};
export default Edit;
