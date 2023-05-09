interface IProps {
  text: string;
  onClick?: (e: React.MouseEvent) => void;
}
const UnderlinedButton = ({ text, onClick }: IProps) => {
  return (
    <button className="text-sm underline" onClick={onClick}>
      {text}
    </button>
  );
};
export default UnderlinedButton;
