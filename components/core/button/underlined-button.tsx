interface IProps {
  text: string;
  onClick: (params: any) => void;
}
const UnderlinedButton = ({ text, onClick }: IProps) => {
  return (
    <button className="text-sm underline" onClick={onClick}>
      {text}
    </button>
  );
};
export default UnderlinedButton;
