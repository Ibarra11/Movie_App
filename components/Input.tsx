import Image from "next/image";
import React, { Dispatch, SetStateAction } from "react";
const Input: (props: {
  setSearchValue: Dispatch<SetStateAction<string>>;
  searchValue: string;
}) => React.ReactElement = ({ setSearchValue, searchValue }) => {
  return (
    <div className="relative mt-16 -translate-y-1/3  flex items-center w-full cursor-pointer isolate overflow-hidden">
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
          placeholder="Search for movies or Tv series"
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
