import { HEADER_ICON_COLOR } from "@/constants";
import ChevronLeft from "../icon/chevron-left";
import { HEADER_ICON_WIDTH } from "@/constants";

interface IProps {
  children: React.ReactNode;
  hasBackBtn?: boolean;
}

const TitleCol = ({ children, hasBackBtn }: IProps) => {
  return (
    <div className="flex items-center gap-1">
      {hasBackBtn && (
        <ChevronLeft width={HEADER_ICON_WIDTH} color={HEADER_ICON_COLOR} />
      )}

      <div className="text-xl font-bold text">{children}</div>
    </div>
  );
};
export default TitleCol;
