interface IProps {
  formType: "background" | "text";
  selectColor: (background: string, color: string) => void;
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

const Pallete = ({ formType, selectColor }: IProps) => {
  return (
    <div>
      <div>{formType === "background" ? "배경" : "폰트"}</div>
      <div className="flex flex-wrap gap-2">
        {palleteColors.map((color) => (
          <div
            onClick={() => selectColor(formType, color)}
            key={color}
            className="w-5 h-5 bg-black border rounded-full"
            style={{ background: color }}
          />
        ))}
      </div>
    </div>
  );
};
export default Pallete;
