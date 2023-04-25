import Layout from "@/components/layout";
import Item from "@/components/tags/item";
import List from "@/components/tags/list";
import useSWR from "swr";
import { Tag } from "@prisma/client";
import Link from "next/link";

const Tags = () => {
  const { data } = useSWR("/api/tags");

  return (
    <Layout>
      <div className="p-4">
        <Link href="/tags/create">태그 추가</Link>
        <List title="책 태그" description="장르, 특징, 목적 등">
          {data?.tags.map((tag: Tag) => (
            <Item key={tag.id} tag={tag} />
          ))}
        </List>
      </div>
    </Layout>
  );
};
export default Tags;
