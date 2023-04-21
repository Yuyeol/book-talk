import SelectableTag from "@/components/selectable-tag";

interface Props {
  selectTag: (id: string) => void;
  tags: string[];
}

const TagForm = ({ selectTag, tags }: Props) => {
  return (
    <>
      <input placeholder="태그" className="" value={tags} onChange={() => {}} />
      <div>태그를 추가해주세요</div>
      <div className="flex flex-wrap gap-2">
        {["1", "2", "3"].map((name) => (
          <SelectableTag
            key={name}
            text={name}
            id={name}
            selectTag={selectTag}
            isSelected={tags.includes(name)}
          />
        ))}
      </div>
    </>
  );
};
export default TagForm;
