import { useEffect, useState } from "react";

// 모달이 컴포넌트들이 마운트 되기 전에 state가 true가 되므로 mount를 이 hook에서 관리
// mount 전후로 transition 처리 할 수 있게 하기 위함
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
