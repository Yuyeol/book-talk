import React, { useEffect, useRef, useState } from "react";
interface Props {
  col1: React.ReactNode;
  col2?: React.ReactNode;
}

const Header = ({ col1, col2 }: Props) => {
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
  }, []);
  return (
    <div className="relative z-50 w-0" style={{ height: headerHeight }}>
      <div
        ref={headerRef}
        className="fixed flex items-center justify-between w-full max-w-lg px-2 py-1 bg-white"
      >
        {col1}
        {col2}
      </div>
    </div>
  );
};
export default Header;
