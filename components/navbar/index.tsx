import Archive from "../icon/archive";
import Book from "../icon/book";
import Friends from "../icon/friends";
import Promotion from "../icon/promotion";
import Tags from "../icon/tags";
import NavItem from "./nav-item";

const ICON_WIDTH = 8;
const ICON_DEFAULT_COLOR = "black";
const ICON_ACTIVE_COLOR = "red";

const Text = ({ text }: { text: string }) => {
  return (
    <div
      className="mt-1 text-xs text-center"
      style={{ color: ICON_DEFAULT_COLOR }}
    >
      {text}
    </div>
  );
};

const NavBar = () => {
  return (
    <div className="absolute bottom-0 w-full bg-white border-t-[1px] border-black">
      <ul className="flex justify-between px-6 py-2">
        <NavItem href="/">
          <Book width={ICON_WIDTH} color={ICON_DEFAULT_COLOR} />
          <Text text="독서중" />
        </NavItem>
        <NavItem href="/archive">
          <Archive width={ICON_WIDTH} color={ICON_DEFAULT_COLOR} />
          <Text text="보관함" />
        </NavItem>
        <NavItem href="/friends">
          <Friends width={ICON_WIDTH} color={ICON_DEFAULT_COLOR} />
          <Text text="친구" />
        </NavItem>
        <NavItem href="/tags">
          <Tags width={ICON_WIDTH} color={ICON_DEFAULT_COLOR} />
          <Text text="태그" />
        </NavItem>
        <NavItem href="/recommend">
          <Promotion width={ICON_WIDTH} color={ICON_DEFAULT_COLOR} />
          <Text text="추천책" />
        </NavItem>
      </ul>
    </div>
  );
};
export default NavBar;
