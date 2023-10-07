import Header from "@/components/header";
import TitleCol from "@/components/header/title-col";
import Memo from "@/components/book/detail/memo";
import Spinner from "@/components/icon/spinner";
import SpinnerWrapper from "@/components/icon/spinner-wrapper";
import Seo from "@/components/Seo";
import useMemosWithInfinite from "@/lib/client/useSwr/useMemosWithInfinite";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

const TITLE = "소셜";

const Social = () => {
  const { data, size, setSize } = useMemosWithInfinite();
  const [reachedEnd, setReachedEnd] = useState(false);
  const [ref, inView] = useInView({});
  useEffect(() => {
    if (reachedEnd) return;
    if (inView) setSize(size + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);
  useEffect(() => {
    if (data) {
      const clonedData = [...data];
      setReachedEnd(clonedData.reverse()[0].memos.length !== 3);
    }
  }, [data]);

  return (
    <>
      <Seo title={TITLE} />
      <Header col1={<TitleCol>{TITLE}</TitleCol>} />
      {data ? (
        <ul className="">
          {data.map((page) =>
            page.memos.map((memo) => <Memo memo={memo} key={memo.id} />)
          )}
          <div ref={ref}></div>
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
