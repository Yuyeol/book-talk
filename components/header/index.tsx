import { HEADER_HEIGHT } from "@/constants";
import React, { useEffect, useRef, useState } from "react";
interface IProps {
  col1: React.ReactNode;
  col2?: React.ReactNode;
}

const Header = ({ col1, col2 }: IProps) => {
  return (
    <div
      className="relative z-50 w-0"
      style={{ height: `${HEADER_HEIGHT}rem` }}
    >
      <div
        className="fixed flex items-center justify-between w-full max-w-lg px-2 bg-white"
        style={{ height: `${HEADER_HEIGHT}rem` }}
      >
        {col1}
        {col2}
      </div>
    </div>
  );
};
export default Header;
