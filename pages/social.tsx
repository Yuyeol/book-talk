import Header from "@/components/header";
import TitleCol from "@/components/header/title-col";
import Layout from "@/components/layout";
import { SWRConfig } from "swr";
import Memo from "@/components/book/detail/memo";
import { ssrFetcher } from "@/lib/server/ssrFetcher";
import { IMemosResponse } from "@/types";
import useMemos from "@/lib/client/useSwr/useMemos";

const Social = () => {
  const { data } = useMemos();

  return (
    <Layout>
      <Header col1={<TitleCol>Social</TitleCol>} />

      <ul className="">
        {data?.memos.map((memo) => (
          <Memo memo={memo} key={memo.id} />
        ))}
      </ul>
    </Layout>
  );
};
export default function Page({
  fallback,
}: {
  fallback: {
    [url: string]: IMemosResponse;
  };
}) {
  return (
    <SWRConfig value={{ fallback }}>
      <Social />
    </SWRConfig>
  );
}

export async function getServerSideProps() {
  return ssrFetcher("/api/memos");
}
