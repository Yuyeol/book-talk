import { useEffect, useState } from "react";
import reactDom from "react-dom";

interface IProps {
  children: React.ReactNode;
}

export const HeaderIconPortal = ({ children }: IProps) => {
  const [el, setEl] = useState<HTMLElement | null>(null);
  useEffect(() => {
    setEl(document.getElementById("header-icon"));
  }, []);
  if (!el) return <></>;
  return reactDom.createPortal(children, el);
};
