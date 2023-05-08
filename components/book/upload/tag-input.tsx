import { Tag } from "@prisma/client";

interface IProps {
  tags: Tag[];
  selectTag: (id: number) => void;
  selectedTags: number[];
}

const TagInput = ({ tags, selectTag, selectedTags }: IProps) => {
  return (
    <>
      <div>태그를 추가해주세요</div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <div
            key={tag.id}
            className={`px-2 text-sm text-white rounded-full ${
              selectedTags.includes(tag.id) && "ring-2 ring-white"
            }`}
            style={{ color: tag.txtColor, background: tag.bgColor }}
            onClick={() => selectTag(tag.id)}
          >
            {tag.name}
          </div>
        ))}
      </div>
    </>
  );
};
export default TagInput;
