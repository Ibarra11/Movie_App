import Nav from "./Nav";
import Input from "./Input";
import type { Dispatch, SetStateAction } from "react";
const Layout: (props: {
  children: React.ReactNode;
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
}) => React.ReactElement = ({ children, setSearchValue, searchValue }) => {
  return (
    <div className="h-full flex flex-col gap-6 md:gap-9 xl:flex-row xl:gap-9 ">
      <Nav />
      <div className="border-4 flex flex-col gap-6 px-4 border-red flex-1 md:px-6">
        <Input searchValue={searchValue} setSearchValue={setSearchValue} />
        {children}
      </div>
    </div>
  );
};

export default Layout;
