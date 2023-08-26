import Plus from "@/components/icon/plus";
import { SOFT_WHITE } from "@/constants";
import useMutation from "@/lib/client/useMutation";
import useMemos from "@/lib/client/useSwr/useMemos";
import { IMemoForm } from "@/types";
import { Memo } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface IProps {
  memo?: Memo;
  setSelectedMemoId: (id: number | undefined) => void;
  isFormOpen: boolean;
  setIsFormOpen: (isOpen: boolean) => void;
}

const Form = ({
  memo,
  setSelectedMemoId,
  isFormOpen,
  setIsFormOpen,
}: IProps) => {
  const {
    query: { bookId },
  } = useRouter();

  const { register, handleSubmit, watch, setValue } = useForm<IMemoForm>();
  const { mutate, data } = useMemos(parseInt(bookId as string));
  const {
    mutation,
    loading,
    data: memoResData,
  } = useMutation(`/api/memos/${memo?.id ?? 0}?bookId=${bookId}`);

  useEffect(() => {
    if (memo) {
      setValue("page", memo.page || undefined);
      setValue("content", memo.content || "");
    }
  }, [memo, setValue]);

  const clearForm = () => {
    setValue("page", undefined);
    setValue("content", "");
    setSelectedMemoId(undefined);
  };
  const onSubmit = ({ page, content }: IMemoForm) => {
    if (loading) return;
    mutation({ page, content }, "POST");
    clearForm();
  };

  useEffect(() => {
    if (memoResData && data) {
      const {
        memo: { id, page, content, bookId, userId, createdAt, updatedAt },
      } = memoResData;
      mutate({
        ok: true,
        memos: memo
          ? [
              ...data.memos,
              {
                id,
                page,
                content,
                bookId,
                userId,
                createdAt,
                updatedAt,
              },
            ]
          : [
              ...data.memos.map((memo) => {
                if (memo.id === id)
                  return { ...memo, page, content, updatedAt };
                return memo;
              }),
            ],
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memoResData]);

  return (
    <div className="px-4 flex flex-col">
      <div
        className={`bg-soft-white border-b-2 border-r-2 border-l-2 border-primary-green rounded-b-xl px-4shadow-md overflow-hidden shadow-md
        transition-all duration-[1000ms] linear
        ${isFormOpen ? "h-[174px]" : "h-0"}`}
      >
        <form className="px-4 py-2">
          <div className="bg-white rounded-xl shadow-md p-2 space-y-1">
            <input
              type="number"
              className="w-full p-1"
              placeholder="페이지"
              {...register("page", { valueAsNumber: true })}
            />
            <textarea
              className="w-full h-16 p-1"
              placeholder="메모"
              rows={1}
              {...register("content")}
            />
          </div>
        </form>
        <div className="px-4 pb-2">
          <button
            onClick={handleSubmit(onSubmit)}
            className={`w-12 rounded-lg text-soft-white shadow-md ${
              watch("content") ? "bg-primary-green" : "bg-grey-3"
            }`}
          >
            등록
          </button>
        </div>
      </div>
      <button
        className="bg-primary-green px-4 py-0.5 rounded-b-xl mx-auto shadow-md"
        onClick={() => setIsFormOpen(!isFormOpen)}
      >
        <div
          className={`transition-all duration-300 ease-in ${
            isFormOpen ? "rotate-45" : ""
          }`}
        >
          <Plus width={1.5} color={SOFT_WHITE} />
        </div>
      </button>
    </div>
  );
};
export default Form;
