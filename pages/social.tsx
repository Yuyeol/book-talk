import Header from "@/components/header";
import TitleCol from "@/components/header/title-col";
import Layout from "@/components/layout";
import useSWR from "swr";
import { IMemoWithReactions } from "./book/[bookId]";
import Memo from "@/components/book/detail/memo";

interface IMemosResponse {
  memos: IMemoWithReactions[];
  ok: boolean;
}

const Social = () => {
  const { data } = useSWR<IMemosResponse>("/api/memos");

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
export default Social;
