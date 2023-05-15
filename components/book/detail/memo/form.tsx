import Plus from "@/components/icon/plus";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

const MEMO_LINEHEIGHT = 1.5;

const Form = () => {
  const [isFormOpen, setIsFormOpen] = useState(true);

  const { register, watch } = useForm();
  const memoRegister = register("memo");
  const memoWatch = watch("memo") || "";

  const calculateHeight = () => {
    const lineHeight = MEMO_LINEHEIGHT * 16; // 텍스트 줄당 높이 (임의로 설정)
    const lines = memoWatch.split("\n").length;
    return lines * lineHeight;
  };

  const formRef = useRef<HTMLDivElement>(null);
  const [formHeight, setFormHeight] = useState(0);
  useEffect(() => {
    if (formRef.current) {
      setFormHeight(formRef.current.offsetHeight);
    }
  }, []);
  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };
  return (
    <>
      <div className={`overflow-hidden ease-in-out relative`}>
        <div
          ref={formRef}
          className={`duration-500 bg-slate-500`}
          style={{ marginTop: isFormOpen ? `0px` : `-${formHeight}px` }}
        >
          <div>
            <input className="w-12" placeholder="page" {...register("page")} />
          </div>
          <div className="flex-1">
            <textarea
              className="w-full h-full"
              style={{
                lineHeight: `${MEMO_LINEHEIGHT}rem`,
                height: `${calculateHeight()}px`,
              }}
              placeholder="메모"
              rows={1}
              {...memoRegister}
            />
          </div>
          <div className="w-12 bg-blue-500">
            <button className="w-full">send</button>
          </div>
        </div>
      </div>
      <button
        onClick={toggleForm}
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
