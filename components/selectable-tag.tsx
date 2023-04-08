const SelectableTag = ({
  name,
  id,
  selectTag,
  isSelected,
}: {
  name: string;
  id: string;
  selectTag: (id: string) => void;
  isSelected: boolean;
}) => {
  return (
    <div
      className={`px-2 text-sm text-white rounded-full bg-slate-600 ${
        isSelected && "ring-2 ring-red-400"
      }`}
      onClick={() => selectTag(id)}
    >
      {name}
    </div>
  );
};

export default SelectableTag;
