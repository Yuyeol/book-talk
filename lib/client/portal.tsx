import { useEffect, useState } from "react";
import reactDom from "react-dom";

interface Props {
  children: React.ReactNode;
}

export const HeaderIconPortal = ({ children }: Props) => {
  const [el, setEl] = useState<HTMLElement | null>(null);
  useEffect(() => {
    setEl(document.getElementById("header-icon"));
  }, []);
  if (!el) return <></>;
  return reactDom.createPortal(children, el);
};
