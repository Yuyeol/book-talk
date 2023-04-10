interface Props {
  id: string;
  text: string;
  openTagModal: (id: string) => void;
}

const TagItem = ({ id, text, openTagModal }: Props) => {
  return (
    <li
      className="px-4 py-1 text-white rounded-full bg-slate-800"
      onClick={() => openTagModal(id)}
    >
      {text}
    </li>
  );
};
export default TagItem;
