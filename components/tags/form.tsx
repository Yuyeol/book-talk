import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useMutation from "@/lib/client/useMutation";
import Palete from "@/components/tags/palete";
import { Tag } from "@prisma/client";
import { ITagForm } from "@/types";
import useTags from "@/lib/client/useSwr/useTags";
import { useSession } from "next-auth/react";
import useToggleTransition from "@/lib/client/useToggleTransition";
import { SOFT_BLACK, SOFT_WHITE } from "@/constants";

interface IProps {
  tag?: Tag;
  isFormOpen: boolean;
  setSelectedTag: (tag: Tag | undefined) => void;
  setIsFormOpen: (isFormOpen: boolean) => void;
}

const Form = ({ tag, isFormOpen, setSelectedTag, setIsFormOpen }: IProps) => {
  const { register, handleSubmit, watch, setValue } = useForm<ITagForm>();
  const { data: session } = useSession();
  const UNMOUNT_DELAY = 500;
  const { isMounted, transitionState } = useToggleTransition(
    isFormOpen,
    UNMOUNT_DELAY
  );
  const { mutate, data } = useTags(session?.user?.id);
  const {
    mutation,
    data: tagResData,
    loading,
  } = useMutation(`/api/tags/${tag?.id ?? 0}`);
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

  const clearForm = () => {
    setTimeout(() => {
      setTagColor({ background: SOFT_BLACK, text: SOFT_WHITE });
      setTagName("");
      setSelectedTag(undefined);
      setValue("name", "");
    }, UNMOUNT_DELAY);
  };
  const onSubmit = (inputs: ITagForm) => {
    if (loading) return;
    if (!inputs.name) return alert("태그 이름을 입력해주세요");
    mutation({ ...inputs, ...tagColor }, "POST");
    clearForm();
  };
  const deleteTag = () => {
    if (loading) return;
    mutation({ id: tag?.id }, "DELETE");
    clearForm();
  };
  useEffect(() => {
    if (tagResData && data) {
      if (tagResData.method === "POST")
        mutate({
          ok: true,
          tags: [
            ...data.tags,
            {
              id: 0,
              name: tagName,
              bgColor: tagColor.background,
              txtColor: tagColor.text,
              userId: tagResData.tag.userId,
              createdAt: tagResData.tag.createdAt,
            },
          ],
        });
      else if (tagResData.method === "DELETE")
        mutate({
          ok: true,
          tags: data.tags.filter((tag: Tag) => tag.id !== tagResData.tag.id),
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tagResData]);

  return (
    <>
      <button
        className="bg-soft-white border-2 border-primary-green px-1 rounded-lg ml-2 my-2 font-semibold"
        onClick={() => {
          clearForm();
          setIsFormOpen(true);
        }}
      >
        + 태그 추가
      </button>
      {isMounted && (
        <div
          className={`transition-all duration-[500ms] ease-in overflow-hidden
          ${transitionState === "end" && "translate-y-4 opacity-0"}
        `}
        >
          <div className="py-2 text-xl font-bold">
            태그 {tag ? "수정" : "등록"}
          </div>
          <div className="p-4 border-2 border-primary-green rounded-xl bg-soft-white">
            <form>
              <div>
                이름
                <input className="c_input flex-1 my-2" {...register("name")} />
              </div>
              <Palete formType="background" selectColor={selectColor} />
              <Palete formType="text" selectColor={selectColor} />
            </form>
            <div
              className="w-fit px-2 text-white rounded-lg bg-slate-800 my-2"
              style={{
                background: tagColor.background,
                color: tagColor.text,
              }}
            >
              {tagName}
            </div>
            <div className="space-x-2">
              <button
                className={`c_button_block_lg w-16 ${
                  !watch("name") && "bg-grey-3"
                }`}
                onClick={handleSubmit(onSubmit)}
              >
                {tag ? "수정" : "등록"}
              </button>
              {tag && (
                <button className="c_button_block_lg w-16" onClick={deleteTag}>
                  삭제
                </button>
              )}
              <button
                className="c_button_block_lg w-16"
                onClick={() => {
                  // clearForm();
                  setIsFormOpen(false);
                }}
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Form;
