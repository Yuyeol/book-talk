interface IProps {
  onClick: any;
  text: string;
}
const Button = ({ onClick, text }: IProps) => {
  return (
    <button
      onClick={onClick}
      className="text-lg text-soft-white bg-primary-green py-1 px-4 rounded-xl mb-8"
    >
      {text}
    </button>
  );
};
export default Button;
