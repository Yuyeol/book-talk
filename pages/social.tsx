import Header from "@/components/header";
import TitleCol from "@/components/header/title-col";
import Layout from "@/components/layout";
import { Memo, User } from "@prisma/client";
import useSWR from "swr";

interface IMemoWithUser extends Memo {
  user: User;
}

interface IMemosResponse {
  memos: IMemoWithUser[];
}

const Social = () => {
  const { data } = useSWR<IMemosResponse>("/api/memos");
  console.log(data);

  return (
    <Layout>
      <Header col1={<TitleCol>Book</TitleCol>} />

      <ul className="">
        {data?.memos.map((memo) => (
          <li key={memo.id}>
            <div>{memo.user.name}</div>
            <div>{memo.content}</div>
          </li>
        ))}
      </ul>
    </Layout>
  );
};
export default Social;
