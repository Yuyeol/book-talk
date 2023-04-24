import Input from "@/components/core/input";
import Layout from "@/components/layout";
import TagItem from "@/components/tags/tag-item";
import TagList from "@/components/tags/tag-list";
import TagModal from "@/components/tags/tag-modal";
import useSWR from "swr";
import { useEffect, useState } from "react";
import { Tag } from "@prisma/client";
import TagModalPortal from "@/components/portal";

const Tags = () => {
  const [selectedTag, setSelectedTag] = useState<number | null>(null);
  const { data } = useSWR("/api/tags");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  useEffect(() => {
    !isModalOpen && setSelectedTag(null);
  }, [isModalOpen]);

  return (
    <Layout>
      {/* 태그 추가버튼은 헤더에 구현. 클릭 시 추가/수정 모달 팝업 */}
      <div className="p-4">
        <button onClick={() => setIsModalOpen(true)}>태그 추가</button>
        <TagList title="책 태그" description="장르, 특징, 목적 등">
          {/* 클릭 시 추가/수정모달로 팝업 */}
          {/* 적당히 크게 구현해도 될듯 */}
          {data?.tags.map((tag: Tag) => (
            <TagItem
              key={tag.id}
              tag={tag}
              setIsModalOpen={setIsModalOpen}
              setSelectedTag={setSelectedTag}
            />
          ))}
        </TagList>
      </div>
      <TagModalPortal>
        {isModalOpen && (
          <TagModal
            tag={
              selectedTag
                ? data.tags.find((tag: Tag) => tag.id === selectedTag)
                : null
            }
            setIsModalOpen={setIsModalOpen}
          />
        )}
      </TagModalPortal>
    </Layout>
  );
};
export default Tags;
