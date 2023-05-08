import { NAVBAR_HEIGHT } from "@/constants";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

const InputBar = () => {
  const { register, watch } = useForm();
  const memoRegister = register("memo");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const memoWatch = watch("memo");
  useEffect(() => {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  }, [memoWatch]);
  return (
    <div
      className="fixed flex w-full max-w-lg -translate-x-1/2 left-1/2 bg-slate-500"
      style={{ bottom: `${NAVBAR_HEIGHT}rem` }}
    >
      <div>
        <input className="w-12" placeholder="page" {...register("page")} />
      </div>
      <div className="flex-1">
        <textarea
          className="w-full h-full"
          placeholder="메모"
          rows={1}
          {...memoRegister}
          ref={(e) => {
            memoRegister.ref(e);
            textareaRef.current = e;
          }}
        />
      </div>
      <div className="w-12 bg-blue-500">
        <button className="w-full">send</button>
      </div>
    </div>
  );
};
export default InputBar;
