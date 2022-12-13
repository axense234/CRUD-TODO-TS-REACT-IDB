// React
import { useEffect } from "react";

// Modal Transition
const useModalTransition = (
  modalRef: React.MutableRefObject<HTMLDivElement | null>,
  show: boolean
) => {
  useEffect(() => {
    const modalComp = modalRef?.current?.style as CSSStyleDeclaration;
    let timeout: any;
    if (show) {
      modalComp.display = "flex";
      timeout = setTimeout(() => {
        modalComp.opacity = "1";
        modalComp.transform = "scale(1)";
      });
    } else {
      timeout = setTimeout(() => {
        modalComp.display = "none";
      }, 3000);
      modalComp.opacity = "0";
      modalComp.transform = "scale(0)";
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [show]);
};

export default useModalTransition;
