import UnderlinedButton from "@/components/core/button/underlined-button";
import { getElapsedTime } from "@/lib/client/getElapsedTime";
import { Memo } from "@prisma/client";

interface IProps {
  memo: Memo;
}

const Memo = ({ memo }: IProps) => {
  return (
    <div className="p-4">
      <div className="px-3 py-2 rounded-lg bg-slate-100">
        <div className="flex items-center justify-between text-xs border-b-[1px] border-slate-400 pb-2 mb-1">
          <div className="">Page. {memo.page}</div>
          <div className="text-xs">
            {getElapsedTime(memo.updatedAt) ?? getElapsedTime(memo.createdAt)}
          </div>
        </div>
        <div>{memo.content}</div>
        <div className="flex justify-end gap-2">
          <UnderlinedButton text="edit" onClick={() => {}} />
          <UnderlinedButton text="delete" onClick={() => {}} />
        </div>
      </div>
    </div>
  );
};
export default Memo;
