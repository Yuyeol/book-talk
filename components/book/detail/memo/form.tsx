import { useAppDispatch, useAppSelector } from "@/app/hooks";
import Plus from "@/components/icon/plus";
import { toggleForm } from "@/features/memo/memoSlice";
import useMutation from "@/lib/client/useMutation";
import { Memo } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

interface IMemoForm {
  page?: number;
  content: string;
}

const MEMO_LINEHEIGHT = 1.5;
interface IProps {
  selectedMemo?: Memo;
}

const Form = ({ selectedMemo }: IProps) => {
  const router = useRouter();
  const { isFormOpen } = useAppSelector((state) => state.memo);
  const dispatch = useAppDispatch();
  const [memoHeight, setMemoHeight] = useState(0);
  const [formHeight, setFormHeight] = useState(0);
  const { register, watch, handleSubmit, setValue } = useForm<IMemoForm>();
  const memoWatch = watch("content") || "";
  const formRef = useRef<HTMLDivElement>(null);
  const { mutation, loading } = useMutation(
    `/api/book/${router.query.id}/memo`
  );

  // 줄 수에 따라 자동으로 textarea 높이 설정
  useEffect(() => {
    // rem을 px로 변환
    const lineHeight = MEMO_LINEHEIGHT * 16;
    const lines = memoWatch.split("\n").length;
    setMemoHeight(lines * lineHeight);
  }, [memoWatch]);

  // form slide를 위해 현재 form height 계산
  useEffect(() => {
    if (formRef.current) {
      setFormHeight(formRef.current.offsetHeight);
    }
  }, []);

  useEffect(() => {
    if (selectedMemo) {
      setValue("page", selectedMemo.page || undefined);
      setValue("content", selectedMemo.content || "");
    }
  }, [selectedMemo, setValue]);

  const onSubmit = ({ page, content }: IMemoForm) => {
    if (loading) return;
    mutation({ page, content, id: selectedMemo?.id ?? 0 }, "POST");
  };

  return (
    <>
      <div className={`overflow-hidden ease-in-out relative`}>
        <div
          ref={formRef}
          className={`duration-500 bg-slate-500`}
          style={{ marginTop: isFormOpen ? `0px` : `-${formHeight}px` }}
        >
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
                style={{
                  lineHeight: `${MEMO_LINEHEIGHT}rem`,
                  height: `${memoHeight}px`,
                }}
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
      </div>
      <button
        onClick={() => dispatch(toggleForm())}
        className="flex justify-center w-12 mx-auto bg-blue-500 rounded-b-md"
      >
        <div
          className={`${isFormOpen ? "rotate-45" : "rotate-0"} duration-500`}
        >
          <Plus width={1.5} color="white" />
        </div>
      </button>
    </>
  );
};
export default Form;
