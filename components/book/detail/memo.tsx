import UnderlinedButton from "@/components/core/button/underlined-button";
import { getElapsedTime, getTime } from "@/lib/client/getElapsedTime";
import { Memo } from "@prisma/client";

interface IProps {
  memo: Memo;
}

const Memo = ({ memo }: IProps) => {
  return (
    <div className="p-4">
      <div className="p-4 rounded-lg bg-slate-100">
        <div className="flex justify-between text-xs">
          <div className="">p. {memo.page}</div>
          <div>{getTime(memo.updatedAt) ?? getTime(memo.createdAt)}</div>
        </div>
        <div>{memo.content}</div>
        <div className="flex justify-end gap-2">
          <button className="mr-auto">toggle mark</button>
          <UnderlinedButton text="edit" />
          <UnderlinedButton text="delete" />
        </div>
      </div>
    </div>
  );
};
export default Memo;
