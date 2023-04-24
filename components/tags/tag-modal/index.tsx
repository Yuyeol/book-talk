import { useEffect, useState } from "react";
import PalleteForm from "./pallete-form";
import { useForm } from "react-hook-form";
import useMutation from "@/lib/client/useMutation";
import { Tag } from "@prisma/client";

interface TagForm {
  name: string;
}

interface Props {
  tag: Tag | null;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const TagModal = ({ tag, setIsModalOpen }: Props) => {
  const { register, handleSubmit, watch } = useForm<TagForm>();
  const { mutation, loading, data, error } = useMutation("/api/tags");

  const [tagColor, setTagColor] = useState({
    background: tag ? tag.bgColor : "#000000",
    text: tag ? tag.txtColor : "#FFFFFF",
  });
  const [tagName, setTagName] = useState("");

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
    tag
      ? mutation({ ...data, ...tagColor, id: tag.id })
      : mutation({ ...data, ...tagColor, id: 0 });
    setIsModalOpen(false);
  };

  return (
    <div className="absolute top-0 z-50 w-screen h-screen max-w-lg -translate-x-2/4 left-1/2">
      {/* modal overlay */}
      <div
        onClick={() => {
          setIsModalOpen(false);
        }}
        className="w-full h-full bg-black bg-opacity-50"
      />
      {/* tag register */}
      <div className="absolute w-3/4 p-4 transform -translate-x-1/2 -translate-y-1/2 bg-white top-1/2 left-1/2 rounded-xl">
        <div>태그 {tag ? "수정" : "등록"}</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            placeholder="태그"
            {...register("name", { value: tag ? tag.name : "" })}
          />
          <PalleteForm formType="background" selectColor={selectColor} />
          <PalleteForm formType="text" selectColor={selectColor} />
          <div>미리보기:</div>
          <div
            style={{ background: tagColor.background, color: tagColor.text }}
          >
            {tagName}
          </div>
          <button>등록</button>
          <button
            onClick={() => {
              setIsModalOpen(false);
            }}
          >
            취소
          </button>
        </form>
      </div>
    </div>
  );
};
export default TagModal;
