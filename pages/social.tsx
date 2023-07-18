import Header from "@/components/header";
import TitleCol from "@/components/header/title-col";
import Memo from "@/components/book/detail/memo";
import useMemos from "@/lib/client/useSwr/useMemos";
import Spinner from "@/components/icon/spinner";
import SpinnerWrapper from "@/components/icon/spinner-wrapper";
import Seo from "@/components/Seo";

const TITLE = "소셜";

const Social = () => {
  const { data } = useMemos(null, { fetchAll: true });
  return (
    <>
      <Seo title={TITLE} />
      <Header col1={<TitleCol>{TITLE}</TitleCol>} />
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
