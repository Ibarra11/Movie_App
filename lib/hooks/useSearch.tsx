import { useState, useEffect, useRef } from "react";
export const useSearch: <T extends { [key: string]: any }>(
  data: T[],
  searchValue: string,
  filterBy: keyof T
) => [T[], boolean] = (data, searchValue, filterBy) => {
  const [state, setState] = useState(data);
  const [filteredState, setFilteredState] = useState(state);
  const [isFiltering, setIsFiltering] = useState(false);
  let timeoutId = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    setState(data);
    setFilteredState(data);
  }, [data]);

  useEffect(() => {
    if (searchValue !== "") {
      setIsFiltering(true);
      timeoutId.current = setTimeout(() => {
        const stateCpy = [...state];
        const filteredSt = stateCpy.filter((e) => {
          const filterValue = e[filterBy].toLowerCase();
          return filterValue.includes(searchValue.toLowerCase());
        });
        setFilteredState(filteredSt);
        setIsFiltering(false);
        return () => {
          if (timeoutId.current) {
            clearTimeout(timeoutId.current);
          }
        };
      }, 500);
    } else {
      setFilteredState(state);
    }
  }, [data, searchValue, state, filterBy]);

  return [filteredState, isFiltering];
};
