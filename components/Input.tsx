import Image from "next/image";
import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction } from "react";
const routes: any = {
  "/": "movies or Tv Series",
  "/movies": "movies",
  "/tv_series": "TV series",
  "/bookmarked": "bookmarked shows",
};
const Input: (props: {
  setSearchValue: Dispatch<SetStateAction<string>>;
  searchValue: string;
}) => React.ReactElement = ({ setSearchValue, searchValue }) => {
  const { pathname } = useRouter();

  return (
    <div className="relative flex items-center w-full cursor-pointer isolate overflow-hidden">
      <div className="flex absolute">
        <Image
          src="/icons/icon-search.svg"
          width={24}
          height={24}
          alt="search icon"
        />
      </div>

      <div className="relative w-full z-10">
        <input
          className="peer appearance-none cursor-pointer bg-transparent  w-full pl-10 py-1 pr-1 border-none text-base text-white caret-red font-light focus:outline-none"
          placeholder={`Search for ${routes[pathname]}`}
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <div className="absolute invisible peer-focus:visible bottom-0 h-px w-[calc(100%_-_theme(spacing.10))] bg-greyishBlue translate-x-10"></div>
      </div>
    </div>
  );
};

export default Input;
