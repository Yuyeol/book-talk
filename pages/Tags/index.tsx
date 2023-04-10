import Input from "@/components/core/input";
import Layout from "@/components/layout";
import Tag from "@/components/tags/tag-item";
import TagList from "@/components/tags/tag-list";
import TagModal from "@/components/tags/tag-modal";
import { useState } from "react";

const Tags = () => {
  const [selectedTag, setSelectedTag] = useState<string>("");
  const openTagModal = (id: string) => {
    setSelectedTag(id);
  };
  return (
    <Layout>
      {/* 태그 추가버튼은 헤더에 구현. 클릭 시 추가/수정 모달 팝업 */}
      <div className="p-4">
        <TagList title="책 태그" description="장르, 특징, 목적 등">
          {/* 클릭 시 추가/수정모달로 팝업 */}
          {/* 적당히 크게 구현해도 될듯 */}
          {["1", "2", "3"].map((i) => (
            <Tag key={i} id={i} text={"tag" + i} openTagModal={openTagModal} />
          ))}
        </TagList>
      </div>
      {/* 모달은 포탈로 최상위로 내보내자 */}
      {/* selectedTag에 저장된 id로 tag정보 불러오기 */}
      <TagModal />
    </Layout>
  );
};
export default Tags;
