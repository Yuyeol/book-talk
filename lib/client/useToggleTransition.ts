import { useEffect, useState } from "react";

const useToggleTransition = (isToggleOpen: boolean, unmountDelay: number) => {
  const [transitionState, setTransitionState] = useState<"start" | "end" | "">(
    ""
  );
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (isToggleOpen) {
      setIsMounted(true);
      setTimeout(() => {
        setTransitionState("start");
      }, 0);
    } else {
      setTransitionState("end");
      setTimeout(() => {
        setIsMounted(false);
      }, unmountDelay);
    }
  }, [isToggleOpen, unmountDelay]);

  return {
    transitionState,
    isMounted,
  };
};

export default useToggleTransition;
