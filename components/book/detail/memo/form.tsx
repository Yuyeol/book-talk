import useMutation from "@/lib/client/useMutation";
import { Memo } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface IMemoForm {
  page?: number;
  content: string;
}
interface IProps {
  memo?: Memo;
}

const Form = ({ memo }: IProps) => {
  const router = useRouter();
  const { register, handleSubmit, setValue } = useForm<IMemoForm>();
  const { mutation, loading } = useMutation(
    `/api/books/${router.query.bookId}/memos`
  );
  useEffect(() => {
    if (memo) {
      setValue("page", memo.page || undefined);
      setValue("content", memo.content || "");
    }
  }, [memo, setValue]);

  const onSubmit = ({ page, content }: IMemoForm) => {
    if (loading) return;
    mutation({ page, content, id: memo?.id ?? 0 }, "POST");
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
