interface Props {
  formType: "background" | "text";
  selectColor: (background: string, color: string) => void;
}

const palleteColors = [
  "#000000",
  "#FFFFFF",
  "#FF0000",
  "#00FF00",
  "#0000FF",
  "#FFFF00",
  "#00FFFF",
  "#FF00FF",
];

const PalleteForm = ({ formType, selectColor }: Props) => {
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
export default PalleteForm;
