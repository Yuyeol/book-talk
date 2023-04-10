interface Props {
  text: string;
  id: string;
  selectTag: (id: string) => void;
  isSelected: boolean;
}

const SelectableTag = ({ text, id, selectTag, isSelected }: Props) => {
  return (
    <div
      className={`px-2 text-sm text-white rounded-full bg-slate-600 ${
        isSelected && "ring-2 ring-red-400"
      }`}
      onClick={() => selectTag(id)}
    >
      {text}
    </div>
  );
};

export default SelectableTag;
