import { NAV_ICON_ACTIVE_COLOR, NAV_ICON_COLOR } from "@/constants";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useMemo } from "react";

interface Props {
  href: string;
  children: React.ReactElement;
  text: string;
}

const Text = ({ text, color }: { text: string; color: string }) => {
  return (
    <div className="mt-1 text-xs text-center" style={{ color: color }}>
      {text}
    </div>
  );
};

const Item = ({ children, text, href }: Props) => {
  const router = useRouter();
  const itemColor =
    router.pathname === href ? NAV_ICON_ACTIVE_COLOR : NAV_ICON_COLOR;

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
