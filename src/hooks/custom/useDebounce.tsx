import { useEffect, useState } from "react";

export const useDebounce = <T,>(value: T, timeout = 500) => {
  const [state, setState] = useState<T>();
  useEffect(() => {
    const timer = setTimeout(() => {
      setState(value);
    }, timeout);
    return () => clearTimeout(timer);
  }, [value, timeout]);
  return state;
};
