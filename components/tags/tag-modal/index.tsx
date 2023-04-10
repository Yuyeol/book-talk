import Input from "@/components/core/input";
import Layout from "@/components/layout";
import Tag from "@/components/tags/tag-item";
import TagList from "@/components/tags/tag-list";
import { useEffect, useState } from "react";
import PalleteForm from "./pallete-form";
import { useForm } from "react-hook-form";

const TagModal = () => {
  const { register, handleSubmit, watch } = useForm();
  const [tagColor, setTagColor] = useState({
    background: "black",
    text: "white",
  });
  const [tagName, setTagName] = useState("태그");
  const selectColor = (formType: string, color: string) => {
    setTagColor((prev) => ({ ...prev, [formType]: color }));
  };

  const handleNameChange = (e: any) => {
    setTagName(e.target.value);
  };

  const onValid = (data: any) => {
    console.log(data);
    console.log(tagColor);
  };

  return (
    <div className="absolute top-0 left-0 w-screen h-screen max-w-lg bg-black bg-opacity-50">
      <div className="absolute w-3/4 p-4 transform -translate-x-1/2 -translate-y-1/2 bg-white top-1/2 left-1/2 rounded-xl">
        {/* 생성으로 들어왔으면 생성으로, 수정으로 들어왔으면 수정으로 */}
        {/* 식별은 id로 하면될듯 */}
        <div>태그 수정</div>
        <div>
          <form onSubmit={handleSubmit(onValid)}>
            <input
              placeholder="태그"
              {...register("tagName")}
              onChange={handleNameChange}
            />
            <input type="submit" />
          </form>
          <PalleteForm formType="background" selectColor={selectColor} />
          <PalleteForm formType="text" selectColor={selectColor} />
        </div>
        <div>미리보기:</div>
        <div style={{ background: tagColor.background, color: tagColor.text }}>
          {tagName}
        </div>
        <button>수정</button>
        <button>취소</button>
      </div>
    </div>
  );
};
export default TagModal;
