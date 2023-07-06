import { HEADER_HEIGHT, NAVBAR_HEIGHT } from "@/constants";

interface IProps {
  children: React.ReactNode;
  type: "screen-center" | "block-center";
  blockHeight?: number;
}
const SpinnerWrapper = ({ children, type, blockHeight }: IProps) => {
  if (type === "screen-center")
    return (
      <div
        className="absolute w-full h-screen flex justify-center items-center"
        style={{
          transform: `translateY(-${HEADER_HEIGHT + NAVBAR_HEIGHT}rem)`,
        }}
      >
        {children}
      </div>
    );
  else if (type === "block-center")
    return (
      <div
        className="w-full flex justify-center items-center"
        style={{ height: `${blockHeight}rem` }}
      >
        {children}
      </div>
    );
  else return <></>;
};

export default SpinnerWrapper;
