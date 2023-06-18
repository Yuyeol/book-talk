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
  console.log(isBack);

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
      transform: isBack ? `translateX(-100%)` : `translateX(100%)`,
    },
    entered: {
      transition: `opacity ${TIMEOUT}ms linear, transform ${TIMEOUT}ms linear`,
      opacity: 1,
      transform: `translateX(0px)`,
    },
    exiting: {
      transition: `opacity ${TIMEOUT}ms linear, transform ${TIMEOUT}ms linear`,
      opacity: 0,
      transform: isBack ? `translateX(100%)` : `translateX(-100px)`,
    },
    exited: {},
    unmounted: {},
  };

  return (
    <div className="relative w-full h-full max-w-lg min-h-screen mx-auto overflow-hidden bg-slate-300">
      <TransitionGroup style={{ position: "relative" }}>
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
              <div className="bg-white">
                <div id="header" style={{ ...headerStyles[status] }} />
              </div>
              <div
                style={{
                  ...pageStyles[status],
                }}
              >
                {children}
              </div>
            </>
          )}
        </Transition>
      </TransitionGroup>
      {router.pathname !== "/login" && <NavBar />}
    </div>
  );
};

export default Layout;
