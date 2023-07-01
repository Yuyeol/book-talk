import { SOFT_BLACK, SUB_GREEN } from "@/constants";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

interface IProps {
  href: string;
  children: React.ReactElement;
  text: string;
}

const Text = ({ text, color }: { text: string; color: string }) => {
  return (
    <div className=" text-[11px] text-center" style={{ color: color }}>
      {text}
    </div>
  );
};

const Item = ({ children, text, href }: IProps) => {
  const router = useRouter();
  const itemColor = router.pathname === href ? SUB_GREEN : SOFT_BLACK;

  const clonedChildren = React.cloneElement(children as React.ReactElement, {
    color: itemColor,
  });

  return (
    <Link href={href} className="flex flex-col items-center w-10">
      {clonedChildren}
      <Text text={text} color={itemColor} />
    </Link>
  );
};
export default Item;
