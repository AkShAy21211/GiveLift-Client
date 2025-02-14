import { useEffect } from "react";

const useNoScroll = (isOpen: boolean) => {
  useEffect(() => {
    if (isOpen) {
      document.documentElement.classList.add("no-doc-scroll");
    } else {
      document.documentElement.classList.remove("no-doc-scroll");
    }
  }, [isOpen]);
};

export default useNoScroll;
