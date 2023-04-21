import { useEffect, useState } from "react";
import PalleteForm from "./pallete-form";
import { useForm } from "react-hook-form";
import useMutation from "@/lib/client/useMutation";

interface TagForm {
  name: string;
}

const TagModal = () => {
  const { register, handleSubmit, watch } = useForm<TagForm>();
  const { mutation, loading, data, error } = useMutation("/api/tags");
  const [tagColor, setTagColor] = useState({
    background: "#000000",
    text: "#FFFFFF",
  });
  const [tagName, setTagName] = useState("태그");
  const selectColor = (formType: string, color: string) => {
    setTagColor((prev) => ({ ...prev, [formType]: color }));
  };

  const tagNameWatch = watch("name");
  useEffect(() => {
    setTagName(tagNameWatch);
  }, [tagNameWatch]);

  const onSubmit = (data: TagForm) => {
    if (loading) return;
    if (!data.name) return alert("태그 이름을 입력해주세요");
    mutation({ ...data, ...tagColor });
    alert("태그가 등록되었습니다");
  };

  return (
    <div className="absolute top-0 left-0 w-screen h-screen max-w-lg bg-black bg-opacity-50">
      <div className="absolute w-3/4 p-4 transform -translate-x-1/2 -translate-y-1/2 bg-white top-1/2 left-1/2 rounded-xl">
        {/* 생성으로 들어왔으면 생성으로, 수정으로 들어왔으면 수정으로 */}
        {/* 식별은 id로 하면될듯 */}
        <div>태그 등록</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input placeholder="태그" {...register("name")} />
          <PalleteForm formType="background" selectColor={selectColor} />
          <PalleteForm formType="text" selectColor={selectColor} />
          <div>미리보기:</div>
          <div
            style={{ background: tagColor.background, color: tagColor.text }}
          >
            {tagName}
          </div>
          <button>등록</button>
          <button>취소</button>
        </form>
      </div>
    </div>
  );
};
export default TagModal;
