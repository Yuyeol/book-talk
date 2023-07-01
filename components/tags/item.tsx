import { Tag } from "@prisma/client";

interface IProps {
  tag: Tag;
  setSelectedTag: (tag: Tag) => void;
  setIsFormOpen: (isFormOpen: boolean) => void;
}

const Item = ({ tag, setSelectedTag, setIsFormOpen }: IProps) => {
  return (
    <button
      onClick={() => {
        setIsFormOpen(true);
        setSelectedTag(tag);
      }}
    >
      <li
        className="px-2 text-white rounded-lg bg-slate-800"
        style={{ background: tag.bgColor, color: tag.txtColor }}
      >
        {tag.name}
      </li>
    </button>
  );
};
export default Item;
