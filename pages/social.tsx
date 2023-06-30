import Header from "@/components/header";
import TitleCol from "@/components/header/title-col";
import Memo from "@/components/book/detail/memo";
import useMemos from "@/lib/client/useSwr/useMemos";

const Social = () => {
  const { data } = useMemos(null, { fetchAll: true });

  return (
    <>
      <Header col1={<TitleCol>Social</TitleCol>} />
      <ul className="">
        {data?.memos.map((memo) => (
          <Memo memo={memo} key={memo.id} />
        ))}
      </ul>
    </>
  );
};
export default Social;
