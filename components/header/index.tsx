import Link from "next/link";
import Plus from "../icon/plus";
import Search from "../icon/search";
import Filter from "../icon/filter";
import Check from "../icon/check";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";

const ICON_WIDTH = 6;
const ICON_DEFAULT_COLOR = "black";
const ICON_ACTIVE_COLOR = "red";

const Header = ({}) => {
  const { pathname } = useRouter();
  const hasBtn = useMemo(
    () => ({
      plus: pathname === "/" || pathname === "/tags",
      search:
        pathname === "/" ||
        pathname === "/archive" ||
        pathname === "/friends" ||
        pathname === "/tags",
      filter:
        pathname === "/" || pathname === "/archive" || pathname === "/tags",
      // check: pathname === "/book/create",
    }),
    [pathname]
  );

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
        <div className="text-lg font-bold text">page</div>
        <div className="flex gap-2">
          {hasBtn.plus && (
            <Link href="">
              <Plus width={ICON_WIDTH} color={ICON_DEFAULT_COLOR} />
            </Link>
          )}
          {hasBtn.search && (
            <button>
              <Search width={ICON_WIDTH} color={ICON_DEFAULT_COLOR} />
            </button>
          )}
          {hasBtn.filter && (
            <button>
              <Filter width={ICON_WIDTH} color={ICON_DEFAULT_COLOR} />
            </button>
          )}
          {/* submit button으로 쓰려 했으나, 페이지 내에 포함되는게 좋을것 같아 주석처리 */}
          {/* {hasBtn.check && (
            <button>
              <Check width={ICON_WIDTH} color={ICON_DEFAULT_COLOR} />
            </button>
          )} */}
        </div>
      </div>
    </div>
  );
};
export default Header;
