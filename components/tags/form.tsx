import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useMutation from "@/lib/client/useMutation";
import Pallete from "@/components/tags/pallete";
import { useRouter } from "next/router";
import { Tag } from "@prisma/client";
import { ITagForm } from "@/types";

interface IProps {
  tag?: Tag;
}

const Form = ({ tag }: IProps) => {
  const router = useRouter();

  const { register, handleSubmit, watch, setValue } = useForm<ITagForm>();

  const { mutation, loading } = useMutation(`/api/tags/${tag?.id ?? 0}`);

  const [tagColor, setTagColor] = useState({
    background: "#000000",
    text: "#FFFFFF",
  });

  useEffect(() => {
    if (tag) {
      setValue("name", tag.name);
      setTagColor({
        background: tag.bgColor,
        text: tag.txtColor,
      });
    }
  }, [tag, setValue]);
  const [tagName, setTagName] = useState("");

  const selectColor = (formType: string, color: string) => {
    setTagColor((prev) => ({ ...prev, [formType]: color }));
  };

  const tagNameWatch = watch("name");
  useEffect(() => {
    setTagName(tagNameWatch);
  }, [tagNameWatch]);

  const onSubmit = (inputs: ITagForm) => {
    if (loading) return;
    if (!inputs.name) return alert("태그 이름을 입력해주세요");
    mutation({ ...inputs, ...tagColor }, "POST");
    goToTagsPage();
  };
  const deleteTag = () => {
    if (loading) return;
    mutation({ id: tag?.id }, "DELETE");
    goToTagsPage();
  };
  const goToTagsPage = () => {
    router.replace("/tags");
  };

  return (
    <>
      <div>태그 {tag ? "수정" : "등록"}</div>
      <form>
        <input placeholder="태그" {...register("name")} />
        <Pallete formType="background" selectColor={selectColor} />
        <Pallete formType="text" selectColor={selectColor} />
        <div>미리보기:</div>
        <div
          style={{
            background: tagColor.background,
            color: tagColor.text,
          }}
        >
          {tagName}
        </div>
      </form>
      <button onClick={handleSubmit(onSubmit)}>{tag ? "수정" : "등록"}</button>
      {tag && <button onClick={deleteTag}>삭제</button>}
      <button onClick={goToTagsPage}>취소</button>
    </>
  );
};

export default Form;
