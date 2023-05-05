import { HEADER_ICON_COLOR } from "@/constants";
import ChevronLeft from "../icon/chevron-left";
import { HEADER_ICON_WIDTH } from "@/constants";
import { useRouter } from "next/router";

interface IProps {
  children: React.ReactNode;
  hasBackBtn?: boolean;
}

const TitleCol = ({ children, hasBackBtn }: IProps) => {
  const router = useRouter();
  return (
    <div className="flex items-center gap-1">
      {hasBackBtn && (
        <button onClick={() => router.back()}>
          <ChevronLeft width={HEADER_ICON_WIDTH} color={HEADER_ICON_COLOR} />
        </button>
      )}

      <div className="text-xl font-bold text">{children}</div>
    </div>
  );
};
export default TitleCol;
