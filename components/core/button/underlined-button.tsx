interface Props {
  text: string;
}
const UnderlinedButton = ({ text }: Props) => {
  return <button className="text-sm underline">{text}</button>;
};
export default UnderlinedButton;
