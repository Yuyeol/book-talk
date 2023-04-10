import Input from "@/components/core/input";
import ImageInput from "@/components/create/image-input";
import Layout from "@/components/layout";
import SelectableTag from "@/components/selectable-tag";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

interface Props {}

const Create = ({}: Props) => {
  const { register, handleSubmit } = useForm();
  const [tags, setTags] = useState<string[]>([]);
  const selectTag = useCallback(
    (id: string) => {
      if (tags.length > 5) {
        alert("태그는 최대 5개까지 선택 가능합니다.");
        return;
      }
      if (tags.includes(id)) {
        setTags(tags.filter((item) => item !== id));
      } else {
        setTags([...tags, id]);
      }
    },
    [tags]
  );
  return (
    <Layout>
      <div className="px-4">
        <form>
          {/* 이미지 인풋 확인되면 작아지면서 나머지 Input들 노출됨 */}
          <ImageInput />
          <Input placeholder="책 제목" register={register("title")} />
          <Input placeholder="글쓴이" register={register("author")} />
          <Input placeholder="설명" register={register("description")} />
          {/* input은 마무리할때 안보이게 처리해도될듯. 디자인따라 정해보자 */}
          <input
            placeholder="태그"
            className=""
            value={tags}
            onChange={() => {}}
          />
        </form>
        <div>
          <div>태그를 추가해주세요</div>
          <div className="flex flex-wrap gap-2">
            {["1", "2", "3"].map((i) => (
              <SelectableTag
                key={i}
                text={`tag${i}`}
                id={i}
                selectTag={selectTag}
                isSelected={tags.includes(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Create;
