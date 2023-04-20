import Input from "@/components/core/input";
import ImageInput from "@/components/create/image-form";
import Layout from "@/components/layout";
import SelectableTag from "@/components/selectable-tag";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface Props {
  selectTag: (id: string) => void;
  tags: string[];
}

const TagForm = ({ selectTag, tags }: Props) => {
  return (
    <>
      <input placeholder="태그" className="" value={tags} onChange={() => {}} />
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
    </>
  );
};
export default TagForm;
