import Header from "@/components/header";
import TitleCol from "@/components/header/title-col";
import Memo from "@/components/book/detail/memo";
import useMemos from "@/lib/client/useSwr/useMemos";
import Spinner from "@/components/icon/spinner";
import SpinnerWrapper from "@/components/icon/spinner-wrapper";

const Social = () => {
  const { data } = useMemos(null, { fetchAll: true });

  return (
    <>
      <Header col1={<TitleCol>Social</TitleCol>} />
      {data ? (
        <ul className="">
          {data.memos.map((memo) => (
            <Memo memo={memo} key={memo.id} />
          ))}
        </ul>
      ) : (
        <SpinnerWrapper type="screen-center">
          <Spinner />
        </SpinnerWrapper>
      )}
    </>
  );
};
export default Social;
