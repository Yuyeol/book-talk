interface IProps {
  icon: React.ReactNode;
  mainDescription: string;
  subDescription: React.ReactNode;
  button: React.ReactNode;
}
const BlankNotice = ({
  icon,
  mainDescription,
  subDescription,
  button,
}: IProps) => {
  return (
    <div className="my-auto">
      <div className="flex flex-col items-center justify-center">
        {icon}
        <div className="text-center text-sm my-2">
          <div className="font-semibold text-sub-green text-lg">
            {mainDescription}
          </div>
          <div className="my-1">{subDescription}</div>
        </div>
        {button}
      </div>
    </div>
  );
};
export default BlankNotice;
