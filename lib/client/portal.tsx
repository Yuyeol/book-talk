import { useEffect, useState } from "react";
import reactDom from "react-dom";

interface IProps {
  children: React.ReactNode;
  id: string;
}

export const Portal = ({ children, id }: IProps) => {
  const [el, setEl] = useState<HTMLElement | null>(null);
  useEffect(() => {
    setEl(document.getElementById(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!el) return <></>;
  return reactDom.createPortal(children, el);
};
