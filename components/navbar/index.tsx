import Archive from "../icon/archive";
import Book from "../icon/book";
import Friends from "../icon/friends";
import Profile from "../icon/profile";
import Tags from "../icon/tags";
import Item from "./item";
import { NAVBAR_HEIGHT, NAVBAR_ZINDEX, NAV_ICON_WIDTH } from "@/constants";
import { CSSProperties } from "react";

interface IProps {
  navStyles: CSSProperties;
}

const NavBar = ({ navStyles }: IProps) => {
  return (
    <div
      className="relative w-0"
      style={{
        height: `${NAVBAR_HEIGHT}rem`,
        zIndex: NAVBAR_ZINDEX,
        ...navStyles,
      }}
    >
      <div className="fixed max-w-lg bottom-0 w-full bg-soft-white rounded-t-xl border-t-grey-2 border-t-2">
        <ul
          className="flex items-center justify-between px-6"
          style={{ height: `${NAVBAR_HEIGHT}rem` }}
        >
          <Item href="/" text="독서중">
            <Book width={NAV_ICON_WIDTH} />
          </Item>
          <Item href="/social" text="소셜">
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
