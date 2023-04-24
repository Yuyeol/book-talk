import { Tag } from "@prisma/client";

interface Props {
  tag: Tag;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedTag: React.Dispatch<React.SetStateAction<number | null>>;
}

const TagItem = ({ tag, setIsModalOpen, setSelectedTag }: Props) => {
  return (
    <li
      className="px-4 py-1 text-white rounded-full bg-slate-800"
      style={{ background: tag.bgColor, color: tag.txtColor }}
      onClick={() => {
        setSelectedTag(tag.id);
        setIsModalOpen(true);
      }}
    >
      {tag.name}
    </li>
  );
};
export default TagItem;
