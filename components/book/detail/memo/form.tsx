import useMutation from "@/lib/client/useMutation";
import useMemos from "@/lib/client/useSwr/useMemos";
import { IMemoForm } from "@/types";
import { Memo } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface IProps {
  memo?: Memo;
}

const Form = ({ memo }: IProps) => {
  const {
    query: { bookId },
    push,
  } = useRouter();
  const { register, handleSubmit, setValue } = useForm<IMemoForm>();
  const { mutate } = useMemos(parseInt(bookId as string));
  const {
    mutation,
    loading,
    data: memoResData,
  } = useMutation(`/api/memos/${memo?.id ?? 0}?bookId=${bookId}`);

  useEffect(() => {
    if (memoResData) {
      mutate();
      push(`/books/${bookId}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memoResData]);
  useEffect(() => {
    if (memo) {
      setValue("page", memo.page || undefined);
      setValue("content", memo.content || "");
    }
  }, [memo, setValue]);

  const onSubmit = ({ page, content }: IMemoForm) => {
    if (loading) return;
    mutation({ page, content }, "POST");
  };
  return (
    <div>
      <form>
        <div>
          <input
            type="number"
            className="w-12"
            placeholder="page"
            {...register("page", { valueAsNumber: true })}
          />
        </div>
        <div className="flex-1">
          <textarea
            className="w-full h-full"
            placeholder="메모"
            rows={1}
            {...register("content")}
          />
        </div>
      </form>
      <button onClick={handleSubmit(onSubmit)} className="w-12 bg-blue-500">
        send
      </button>
    </div>
  );
};
export default Form;
