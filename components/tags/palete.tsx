import { SOFT_BLACK, SOFT_WHITE } from "@/constants";
import Check from "../icon/check";

interface IProps {
  formType: "background" | "text";
  selectColor: (background: string, color: string) => void;
  currentColor: string;
}

const palleteColors = [
  "#F2F2F2",
  "#0D0D0D",
  "#5DB075",
  "#73B973",
  "#9F73FF",
  "#9FAAFF",
  "#AA5AFF",
  "#B46464",
  "#EC6195",
  "#F39FFF",
  "#FF512E",
  "#FF5C72",
  "#FF6060",
  "#FF693A",
  "#FF704D",
  "#FF7ECC",
  "#FF7F00",
  "#FF85FF",
  "#FF8C63",
  "#FF9300",
  "#FF99AB",
  "#FFB533",
  "#FFC359",
  "#FFC4E3",
  "#FFCC00",
  "#FFCF00",
  "#FFD361",
  "#FFDA14",
];

const Palete = ({ formType, selectColor, currentColor }: IProps) => {
  return (
    <>
      <div>{formType === "background" ? "배경" : "폰트"}</div>
      <div className="flex flex-nowrap gap-2 overflow-x-scroll py-2">
        {palleteColors.map((color) => (
          <div
            onClick={() => selectColor(formType, color)}
            key={color}
            className="w-[20px] h-[20px] min-w-[20px] bg-black border rounded-full overflow-x-auto"
            style={{ background: color }}
          >
            {currentColor === color && (
              <Check
                width={1}
                color={color === "#F2F2F2" ? SOFT_BLACK : SOFT_WHITE}
              />
            )}
          </div>
        ))}
      </div>
    </>
  );
};
export default Palete;
