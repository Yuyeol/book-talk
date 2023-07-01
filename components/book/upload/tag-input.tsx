import { Tag } from "@prisma/client";

interface IProps {
  tags: Tag[];
  selectTag: (id: number) => void;
  selectedTags: number[];
}

const TagInput = ({ tags, selectTag, selectedTags }: IProps) => {
  return (
    <>
      <div className="mt-3 mb-1">태그를 추가해주세요</div>
      <div className="flex flex-wrap gap-2 px-2">
        {tags.map((tag) => (
          <div
            key={tag.id}
            className={`px-2 text-sm text-white rounded-lg ${
              selectedTags.includes(tag.id) &&
              "ring-sub-green ring-2 ring-offset-1"
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
