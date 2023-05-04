import { useCallback, useEffect, useRef, useState } from "react";
import Archive from "../icon/archive";
import Book from "../icon/book";
import Friends from "../icon/friends";
import Profile from "../icon/profile";
import Tags from "../icon/tags";
import Item from "./item";
import { NAVBAR_HEIGHT, NAV_ICON_WIDTH } from "@/constants";

const Text = ({ text, color }: { text: string; color?: string }) => {
  return (
    <div className="mt-1 text-xs text-center" style={{ color: color }}>
      {text}
    </div>
  );
};

const NavBar = () => {
  return (
    <div
      className="relative z-50 w-0"
      style={{ height: `${NAVBAR_HEIGHT}rem` }}
    >
      <div className="fixed max-w-lg bottom-0 w-full bg-white border-t-[1px] border-black">
        <ul
          className="flex items-center justify-between px-6"
          style={{ height: `${NAVBAR_HEIGHT}rem` }}
        >
          <Item href="/" text="독서중">
            <Book width={NAV_ICON_WIDTH} />
          </Item>
          <Item href="/archive" text="보관함">
            <Archive width={NAV_ICON_WIDTH} />
          </Item>
          <Item href="/friends" text="친구">
            <Friends width={NAV_ICON_WIDTH} />
          </Item>
          <Item href="/tags" text="태그">
            <Tags width={NAV_ICON_WIDTH} />
          </Item>
          <Item href="/profile" text="프로필">
            <Profile width={NAV_ICON_WIDTH} />
          </Item>
        </ul>
      </div>
    </div>
  );
};
export default NavBar;
