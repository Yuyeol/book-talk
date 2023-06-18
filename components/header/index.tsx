import { HEADER_HEIGHT, HEADER_ZINDEX } from "@/constants";
import { HeaderPortal } from "@/lib/client/portal";
import React from "react";
interface IProps {
  col1: React.ReactNode;
  col2?: React.ReactNode;
}

const Header = ({ col1, col2 }: IProps) => {
  return (
    <HeaderPortal>
      <div
        className="relative w-0"
        style={{ height: `${HEADER_HEIGHT}rem`, zIndex: HEADER_ZINDEX }}
      >
        <div
          className="fixed flex items-center justify-between w-full max-w-lg px-2 bg-white"
          style={{ height: `${HEADER_HEIGHT}rem` }}
        >
          {col1}
          {col2}
        </div>
      </div>
    </HeaderPortal>
  );
};
export default Header;
