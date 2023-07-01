import { IUserWithRelations } from "@/types";
import React from "react";

interface IProps {
  user: IUserWithRelations;
}

const Item = ({ title, count }: { title: string; count: number }) => {
  return (
    <div className="text-center flex-1">
      <div className="font-bold text-lg">{title}</div>
      <div>{count}</div>
    </div>
  );
};

const Status = ({ user }: IProps) => {
  return (
    <div className="px-4 my-4">
      <div className="flex divide-x-[1px] divide-primary-green/50 border-primary-green border-2 rounded-xl max-w-sm mx-auto py-2">
        <Item title="친구" count={user.friendsTo.length || 0} />
        <Item title="책" count={user.books.length || 0} />
        <Item title="메모" count={user.memos.length || 0} />
        <Item title="태그" count={user.tags.length || 0} />
      </div>
    </div>
  );
};
export default Status;
