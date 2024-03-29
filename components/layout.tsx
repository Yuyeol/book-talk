import { useRouter } from "next/router";
import NavBar from "./navbar";
import { Transition, TransitionGroup } from "react-transition-group";
import { CSSProperties, useEffect, useState } from "react";

interface IProps {
  children: React.ReactNode;
}

const TIMEOUT = 300;

type TransitionKind<RC> = {
  children: RC;
};
const Layout: React.FC<TransitionKind<React.ReactNode>> = ({
  children,
}: IProps) => {
  const [isBack, setIsBack] = useState(false);
  const router = useRouter();

  useEffect(() => {
    router.beforePopState(() => {
      setIsBack(true);
      return true;
    });

    return () => {
      router.beforePopState(() => {
        return true;
      });
    };
  }, [router]);

  const headerStyles = {
    entering: {
      position: `absolute` as CSSProperties["position"],
      opacity: 0,
    },
    entered: {
      opacity: 1,
      transition: `opacity ${TIMEOUT}ms linear`,
    },
    exiting: { opacity: 0, transition: `opacity ${TIMEOUT}ms linear` },
    exited: {},
    unmounted: {},
  };

  const pageStyles = {
    entering: {
      position: `absolute` as CSSProperties["position"],
      opacity: 0,
    },
    entered: {
      opacity: 1,
      transform: `translateX(0px)`,
    },
    exiting: {
      opacity: 0,
    },
    exited: {},
    unmounted: {},
  };
  const navStyles = {
    entering: {
      position: `absolute` as CSSProperties["position"],
    },
    entered: {},
    exiting: {},
    exited: {},
    unmounted: {},
  };

  return (
    <TransitionGroup
      component="div"
      className="relative w-full h-full max-w-lg min-h-screen mx-auto overflow-hidden bg-white flex flex-col"
    >
      <Transition
        key={router.pathname}
        timeout={{
          enter: TIMEOUT,
          exit: TIMEOUT,
        }}
        onEntered={() => isBack && setIsBack(false)}
      >
        {(status) => (
          <>
            <div className="bg-soft-white">
              <div id="header" style={{ ...headerStyles[status] }} />
            </div>
            <div
              className="flex-1 flex flex-col"
              style={{
                ...pageStyles[status],
              }}
            >
              {children}
            </div>
            {router.pathname !== "/login" && (
              <NavBar navStyles={navStyles[status]} />
            )}
          </>
        )}
      </Transition>
    </TransitionGroup>
  );
};

export default Layout;
