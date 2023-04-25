import Layout from "@/components/layout";
import TagItem from "@/components/tags/tag-item";
import TagList from "@/components/tags/tag-list";
import useSWR from "swr";
import { Tag } from "@prisma/client";
import Link from "next/link";

const Tags = () => {
  const { data } = useSWR("/api/tags");

  return (
    <Layout>
      <div className="p-4">
        <Link href="/tags/create">태그 추가</Link>
        <TagList title="책 태그" description="장르, 특징, 목적 등">
          {data?.tags.map((tag: Tag) => (
            <TagItem key={tag.id} tag={tag} />
          ))}
        </TagList>
      </div>
    </Layout>
  );
};
export default Tags;
