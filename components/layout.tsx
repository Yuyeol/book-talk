import { useRouter } from "next/router";
import NavBar from "./navbar";
import { Transition, TransitionGroup } from "react-transition-group";
import { CSSProperties } from "react";

interface IProps {
  children: React.ReactNode;
}

const TIMEOUT = 300;

const getTransitionStyles = {
  entering: {
    position: `absolute` as CSSProperties["position"],
    opacity: 0,
    transform: `translateX(100%)`,
  },
  entered: {
    transition: `opacity ${TIMEOUT}ms linear, transform ${TIMEOUT}ms linear`,
    opacity: 1,
    transform: `translateX(0px)`,
  },
  exiting: {
    transition: `opacity ${TIMEOUT}ms linear, transform ${TIMEOUT}ms linear`,
    opacity: 0,
    transform: `translateX(-100px)`,
  },
  exited: { opacity: 1, transform: `translateX(0px)` },
  unmounted: {},
};

type TransitionKind<RC> = {
  children: RC;
};
const Layout: React.FC<TransitionKind<React.ReactNode>> = ({
  children,
}: IProps) => {
  const { pathname } = useRouter();
  return (
    <div className="relative w-full h-full max-w-lg min-h-screen mx-auto overflow-hidden bg-slate-300">
      <TransitionGroup style={{ position: "relative" }}>
        <Transition
          key={pathname}
          timeout={{
            enter: TIMEOUT,
            exit: TIMEOUT,
          }}
        >
          {(status) => (
            <div
              style={{
                ...getTransitionStyles[status],
              }}
            >
              {children}
            </div>
          )}
        </Transition>
      </TransitionGroup>
      {pathname !== "/login" && <NavBar />}
    </div>
  );
};

export default Layout;
