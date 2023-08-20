import { useRef, useEffect } from "react";

export const useSearch = function () {
  const element = useRef(null);
  useEffect(() => {
    element.current.focus();
  });
  return element;
};
