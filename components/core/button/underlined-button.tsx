interface IProps {
  text: string;
}
const UnderlinedButton = ({ text }: IProps) => {
  return <button className="text-sm underline">{text}</button>;
};
export default UnderlinedButton;
