import { Tag } from "@prisma/client";
import Link from "next/link";

interface Props {
  tag: Tag;
}

const TagItem = ({ tag }: Props) => {
  return (
    <Link href={`/tags/${tag.id}/edit`}>
      <li
        className="px-4 py-1 text-white rounded-full bg-slate-800"
        style={{ background: tag.bgColor, color: tag.txtColor }}
      >
        {tag.name}
      </li>
    </Link>
  );
};
export default TagItem;
