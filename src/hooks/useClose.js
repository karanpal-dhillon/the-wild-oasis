import { useRef } from "react";
import { useEffect } from "react";
export function useClose(close) {
  const ref = useRef(null);
  useEffect(
    function() {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          close();
        }
      }
      document.addEventListener("click", handleClick, true);
      return () => document.removeEventListener("click", handleClick, true);
    },
    [close, ref],
  );
  return ref;
}
