import UnderlinedButton from "@/components/core/button/underlined-button";

const CommentBox = () => {
  return (
    <div className="p-4">
      <div className="p-4 rounded-lg bg-slate-100">
        <div className="flex justify-between text-xs">
          <div className="">p.12</div>
          <div>2022.2.1</div>
        </div>
        <div>comment ... ok write</div>
        <div className="flex justify-end gap-2">
          <button className="mr-auto">toggle mark</button>
          <UnderlinedButton text="edit" />
          <UnderlinedButton text="delete" />
        </div>
      </div>
    </div>
  );
};
export default CommentBox;
