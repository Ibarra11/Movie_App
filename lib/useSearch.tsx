import { useState, useEffect, useRef } from "react";
export const useSearch: <T extends { [key: string]: any }>(
  data: T[],
  searchValue: string,
  filterValue: keyof T
) => T[] = (data, searchValue, filterValue) => {
  const [state, setState] = useState(data);
  const [filteredState, setFilteredState] = useState(state);

  let timeoutId = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    setState(data);
  }, [data]);

  useEffect(() => {
    timeoutId.current = setTimeout(() => {
      const stateCpy = [...state];
      const filteredSt = stateCpy.filter((e) => {
        e[filterValue];
        return e[filterValue].includes(searchValue);
      });
      setFilteredState(filteredSt);
      return () => {
        if (timeoutId.current) {
          clearTimeout(timeoutId.current);
        }
      };
    }, 500);
  }, [data, searchValue, state, filterValue]);

  return filteredState;
};
