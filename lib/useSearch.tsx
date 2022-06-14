import { useState, useEffect, useRef } from "react";
import { Movie } from "../graphql/generated-types";
export const useSearch: <T extends Movie[]>(
  data: T,
  searchValue: string
) => Readonly<[T]> = (data, searchValue) => {
  const [state, setState] = useState(data);
  const [filteredState, setFilteredState] = useState<typeof data>(state);
  let timeoutId = useRef<NodeJS.Timeout | undefined>(undefined);
  useEffect(() => {
    setState(data);
  }, [data]);

  useEffect(() => {
    timeoutId.current = setTimeout(() => {
      const stateCpy = state.slice();
      const filteredSt = stateCpy.filter((e) => {
        return e.title.includes(searchValue);
      });
      setFilteredState(filteredSt as typeof data);
      return () => {
        if (timeoutId.current) {
          clearTimeout(timeoutId.current);
        }
      };
    }, 300);
  }, [searchValue, state]);

  return [filteredState];
};
